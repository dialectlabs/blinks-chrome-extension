import React from 'react';
import {
  Action,
  type ActionAdapter,
  type ActionCallbacksConfig,
  ActionsRegistry,
  type ActionSupportStrategy,
  ActionsURLMapper,
  checkSecurity,
  defaultActionSupportStrategy,
  getExtendedActionState,
  getExtendedInterstitialState,
  getExtendedWebsiteState,
  isInterstitial,
  proxify,
  type SecurityLevel,
} from '@dialectlabs/blinks-core';
import { createRoot } from 'react-dom/client';
import { Blink, type StylePreset } from '@dialectlabs/blinks';
import { getTwitchStylePreset } from './twitchStyles';
import DOMPurify from 'dompurify';

type ObserverSecurityLevel = SecurityLevel;

const noop = () => {};

export interface ObserverOptions {
  securityLevel:
    | ObserverSecurityLevel
    | Record<'websites' | 'interstitials' | 'actions', ObserverSecurityLevel>;
  supportStrategy: ActionSupportStrategy;
}

interface NormalizedObserverOptions {
  securityLevel: Record<
    'websites' | 'interstitials' | 'actions',
    ObserverSecurityLevel
  >;
  supportStrategy: ActionSupportStrategy;
}

const DEFAULT_OPTIONS: ObserverOptions = {
  securityLevel: 'only-trusted',
  supportStrategy: defaultActionSupportStrategy,
};

const normalizeOptions = (
  options: Partial<ObserverOptions>,
): NormalizedObserverOptions => {
  return {
    ...DEFAULT_OPTIONS,
    ...options,
    securityLevel: (() => {
      if (!options.securityLevel) {
        return {
          websites: DEFAULT_OPTIONS.securityLevel as ObserverSecurityLevel,
          interstitials: DEFAULT_OPTIONS.securityLevel as ObserverSecurityLevel,
          actions: DEFAULT_OPTIONS.securityLevel as ObserverSecurityLevel,
        };
      }

      if (typeof options.securityLevel === 'string') {
        return {
          websites: options.securityLevel,
          interstitials: options.securityLevel,
          actions: options.securityLevel,
        };
      }

      return options.securityLevel;
    })(),
  };
};

// Initialize the set if it doesn't exist
if (typeof window.processedLinks === 'undefined') {
  window.processedLinks = new Set<string>();
}

export function setupTwitchObserver(
  config: ActionAdapter,
  callbacks: Partial<ActionCallbacksConfig> = {},
  options: Partial<ObserverOptions> = DEFAULT_OPTIONS,
) {
  const mergedOptions = normalizeOptions(options);
  const twitchRoot = document.querySelector('#root')!;

  const refreshRegistry = async () => {
    return ActionsRegistry.getInstance().init();
  };

  const initObserver = () => {
    // Clear processed links on each navigation
    window.processedLinks = new Set<string>();

    // Initial scan of existing content
    handleExistingNodes(twitchRoot, config, callbacks, mergedOptions);

    // Set up observer for future changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            handleNewNode(
              node as Element,
              config,
              callbacks,
              mergedOptions,
            ).catch(console.error);
          }
        }
      }
    });

    observer.observe(twitchRoot, { childList: true, subtree: true });

    return observer;
  };

  refreshRegistry().then(() => {
    let observer = initObserver();

    // Listen for URL changes
    const urlObserver = new MutationObserver(() => {
      const currentURL = window.location.href;
      if (currentURL !== window.lastProcessedURL) {
        window.lastProcessedURL = currentURL;
        observer.disconnect();
        observer = initObserver();
      }
    });

    const titleElement = document.querySelector('head > title');
    if (titleElement) {
      urlObserver.observe(titleElement, {
        subtree: true,
        characterData: true,
        childList: true,
      });
    } else {
      console.warn('Title element not found for URL observation');
    }
  });
}

function handleExistingNodes(
  root: Element,
  config: ActionAdapter,
  callbacks: Partial<ActionCallbacksConfig>,
  options: NormalizedObserverOptions,
) {
  const links = root.querySelectorAll('a[href^="https://"]');
  for (const link of links) {
    handleNewNode(link, config, callbacks, options).catch(console.error);
  }
}

async function handleNewNode(
  node: Element,
  config: ActionAdapter,
  callbacks: Partial<ActionCallbacksConfig>,
  options: NormalizedObserverOptions,
) {
  const links =
    node.tagName.toLowerCase() === 'a'
      ? [node]
      : node.querySelectorAll('a[href^="https://"]');
  for (const link of links) {
    const url = new URL(link.getAttribute('href')!);
    const actionUrl = url.toString();

    // Skip if this link has already been processed
    if (window.processedLinks.has(actionUrl)) continue;
    window.processedLinks.add(actionUrl);

    try {
      const action = await getActionForUrl(actionUrl, config, options);
      if (action) {
        createAction({
          originalUrl: url,
          action,
          callbacks,
          options,
          isInterstitial: isInterstitial(actionUrl).isInterstitial,
          container: link.parentElement!,
        });
      }
    } catch (error) {
      console.error('Error processing link:', actionUrl, error);
    }
  }
}

async function getActionForUrl(
  actionUrl: string,
  config: ActionAdapter,
  options: NormalizedObserverOptions,
): Promise<Action | null> {
  const interstitialData = isInterstitial(actionUrl);

  let actionApiUrl: string | null;
  if (interstitialData.isInterstitial) {
    const interstitialState = getExtendedInterstitialState(actionUrl);
    if (
      !checkSecurity(interstitialState, options.securityLevel.interstitials)
    ) {
      return null;
    }
    actionApiUrl = interstitialData.decodedActionUrl;
  } else {
    const websiteState = getExtendedWebsiteState(actionUrl);
    if (!checkSecurity(websiteState, options.securityLevel.websites)) {
      return null;
    }
    const actionsJsonUrl = new URL(actionUrl).origin + '/actions.json';
    try {
      const actionsJson = await fetch(proxify(actionsJsonUrl)).then((res) =>
        res.json(),
      );
      const actionsUrlMapper = new ActionsURLMapper(actionsJson);
      actionApiUrl = actionsUrlMapper.mapUrl(new URL(actionUrl));
    } catch (error) {
      console.error('Error fetching actions.json:', error);
      return null;
    }
  }

  const state = actionApiUrl ? getExtendedActionState(actionApiUrl) : null;
  if (
    !actionApiUrl ||
    !state ||
    !checkSecurity(state, options.securityLevel.actions)
  ) {
    return null;
  }

  try {
    return await Action.fetch(actionApiUrl, config, options.supportStrategy);
  } catch (error) {
    console.error('Error fetching action:', error);
    return null;
  }
}

function createAction({
  originalUrl,
  action,
  callbacks,
  options,
  isInterstitial,
  container,
}: {
  originalUrl: URL;
  action: Action;
  callbacks: Partial<ActionCallbacksConfig>;
  options: NormalizedObserverOptions;
  isInterstitial: boolean;
  container: HTMLElement;
}) {
  const actionContainer = document.createElement('div');
  actionContainer.className = 'dialect-action-root-container';
  container.appendChild(actionContainer);

  const actionRoot = createRoot(actionContainer);

  const isDarkMode = document.body.classList.contains('tw-root--theme-dark');
  const stylePreset = getTwitchStylePreset(isDarkMode);

  const sanitizedUrl = DOMPurify.sanitize(originalUrl.toString());
  const sanitizedHostname = DOMPurify.sanitize(originalUrl.hostname);

  actionRoot.render(
    React.createElement(
      'div',
      { onClick: (e: React.MouseEvent) => e.stopPropagation() },
      React.createElement(Blink, {
        stylePreset: stylePreset,
        action: action,
        websiteUrl: sanitizedUrl,
        websiteText: sanitizedHostname,
        callbacks: callbacks,
        securityLevel: options.securityLevel,
      }),
    ),
  );
}
