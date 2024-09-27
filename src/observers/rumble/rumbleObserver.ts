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
import { getRumbleStylePreset } from './rumbleStyles';
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

export function setupRumbleObserver(
  config: ActionAdapter,
  callbacks: Partial<ActionCallbacksConfig> = {},
  options: Partial<ObserverOptions> = DEFAULT_OPTIONS,
) {
  const mergedOptions = normalizeOptions(options);
  const rumbleRoot = document.querySelector('body')!;

  const refreshRegistry = async () => {
    return ActionsRegistry.getInstance().init();
  };

  const initObserver = () => {
    window.processedLinks = new Set<string>();
    handleExistingNodes(rumbleRoot, config, callbacks, mergedOptions);

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

    observer.observe(rumbleRoot, { childList: true, subtree: true });

    return observer;
  };

  refreshRegistry().then(() => {
    let observer = initObserver();

    // Listen for URL changes
    let lastUrl = location.href;
    new MutationObserver(() => {
      const url = location.href;
      if (url !== lastUrl) {
        lastUrl = url;
        window.lastProcessedURL = url;
        observer.disconnect();
        observer = initObserver();
      }
    }).observe(document, { subtree: true, childList: true });
  });
}

function handleExistingNodes(
  root: Element,
  config: ActionAdapter,
  callbacks: Partial<ActionCallbacksConfig>,
  options: NormalizedObserverOptions,
) {
  // Handle video descriptions
  const descriptions = root.querySelectorAll('.video-description');
  descriptions.forEach((description) => {
    const links = description.querySelectorAll('a[href^="https://"]');
    links.forEach((link) => {
      handleNewNode(link, config, callbacks, options).catch(console.error);
    });
  });

  // Handle comments
  const comments = root.querySelectorAll('.comment-text');
  comments.forEach((comment) => {
    const links = comment.querySelectorAll('a[href^="https://"]');
    links.forEach((link) => {
      handleNewNode(link, config, callbacks, options).catch(console.error);
    });
  });

  // Handle user profiles
  const userProfiles = root.querySelectorAll('.user-profile-bio');
  userProfiles.forEach((profile) => {
    const links = profile.querySelectorAll('a[href^="https://"]');
    links.forEach((link) => {
      handleNewNode(link, config, callbacks, options).catch(console.error);
    });
  });
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

  const isDarkMode = document.body.classList.contains('theme-dark');
  const stylePreset = getRumbleStylePreset(isDarkMode);

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
