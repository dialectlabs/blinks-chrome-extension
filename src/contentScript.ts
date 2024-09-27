import '@dialectlabs/blinks/index.css';
import { setupTwitterObserver } from '@dialectlabs/blinks/ext/twitter';
import {
  Action,
  ActionAdapter,
  ActionConfig,
  ActionContext,
  BlinkSecurityState,
  BlockchainIds,
} from '@dialectlabs/blinks';
import postHogClient from './analytics';
import { setupRedditObserver } from './observers/reddit/redditObserver';
import { injectRedditStyles } from './observers/reddit/redditStyles';
import { injectGmailStyles } from './observers/gmail/gmailStyles';
import { setupGmailObserver } from './observers/gmail/gmailObserver';
import { injectPinterestStyles } from './observers/pinterest/pinterestStyles';
import { setupPinterestObserver } from './observers/pinterest/pinterestObserver';
import { injectTelegramStyles } from './observers/telegram/telegramStyles';
import { setupTelegramObserver } from './observers/telegram/telegramObserver';

const script = document.createElement('script');
script.src = chrome.runtime.getURL('provider.js');
script.onload = () => {
  script.remove();
};
(document.head || document.documentElement).appendChild(script);

export class ActionConfigWithAnalytics implements ActionAdapter {
  constructor(
    private actionAdapter: ActionAdapter,
    private wallet: string,
  ) {}

  get metadata() {
    return this.actionAdapter.metadata;
  }

  async signTransaction(tx: string, context: ActionContext) {
    const triggeredUrlObj = new URL(context.triggeredLinkedAction.href);
    const analyticsParams = {
      originalUrl: context.originalUrl,
      actionHost: new URL(context.action.url).host,
      actionUrl: context.action.url,
      triggeredUrl: triggeredUrlObj.origin + triggeredUrlObj.pathname, // omitting query params, since they may contain user entered data,
      triggeredLabel: context.triggeredLinkedAction.label,
      isForm: context.triggeredLinkedAction.parameters.length > 1,
      securityState: context.actionType,
      isChained: context.action.isChained,
      wallet: this.wallet,
      client: 'extension',
    };

    postHogClient?.capture('action_sign_initiated', analyticsParams);
    const result = await this.actionAdapter.signTransaction(tx, context);

    if ('signature' in result) {
      postHogClient?.capture('action_sign_success', {
        ...analyticsParams,
        signature: result.signature,
      });
    } else {
      postHogClient?.capture('action_sign_failed', analyticsParams);
    }

    return result;
  }

  async confirmTransaction(
    signature: string,
    context: ActionContext,
  ): Promise<void> {
    const triggeredUrlObj = new URL(context.triggeredLinkedAction.href);
    const analyticsParams = {
      signature,
      originalUrl: context.originalUrl,
      actionHost: new URL(context.action.url).host,
      actionUrl: context.action.url,
      triggeredUrl: triggeredUrlObj.origin + triggeredUrlObj.pathname, // omitting query params, since they may contain user entered data,
      triggeredLabel: context.triggeredLinkedAction.label,
      isForm: context.triggeredLinkedAction.parameters.length > 1,
      securityState: context.actionType,
      isChained: context.action.isChained,
      wallet: this.wallet,
      client: 'extension',
    };

    try {
      postHogClient?.capture('action_confirm_initiated', analyticsParams);
      await this.actionAdapter.confirmTransaction(signature, context);
      postHogClient?.capture('action_confirm_success', analyticsParams);
    } catch {
      postHogClient?.capture('action_confirm_failed', analyticsParams);
    }
  }

  async connect(context: ActionContext) {
    const triggeredUrlObj = new URL(context.triggeredLinkedAction.href);
    const analyticsParams = {
      originalUrl: context.originalUrl,
      actionHost: new URL(context.action.url).host,
      actionUrl: context.action.url,
      triggeredUrl: triggeredUrlObj.origin + triggeredUrlObj.pathname, // omitting query params, since they may contain user entered data,
      triggeredLabel: context.triggeredLinkedAction.label,
      isForm: context.triggeredLinkedAction.parameters.length > 1,
      securityState: context.actionType,
      isChained: context.action.isChained,
      wallet: this.wallet,
      client: 'extension',
    };

    try {
      postHogClient?.capture('action_connect_initiated', analyticsParams);

      const address = await this.actionAdapter.connect(context);
      if (address) {
        postHogClient?.identify(address, { wallet: this.wallet });
        postHogClient?.capture('action_connect_success', analyticsParams);
      } else {
        postHogClient?.capture('action_connect_failed', analyticsParams);
        postHogClient?.reset();
      }

      return address;
    } catch {
      return null;
    }
  }
}

const adapter = (wallet: string) =>
  new ActionConfigWithAnalytics(
    new ActionConfig(import.meta.env.VITE_RPC_URL, {
      signTransaction: (tx: string) =>
        chrome.runtime.sendMessage({
          type: 'sign_transaction',
          wallet,
          payload: {
            txData: tx,
          },
        }),
      connect: () =>
        chrome.runtime.sendMessage({
          wallet,
          type: 'connect',
        }),
      metadata: {
        supportedBlockchainIds: [BlockchainIds.SOLANA_MAINNET],
      },
    }),
    wallet,
  );

// function initTwitterObserver() {
//   chrome.runtime.sendMessage({ type: 'getSelectedWallet' }, (wallet) => {
//     if (wallet) {
//       postHogClient?.capture('twitter_observer_init_success', { wallet });
//       setupTwitterObserver(adapter(wallet), {
//         onActionMount: async (action, originalUrl, type) => {
//           postHogClient?.capture('action_mount', {
//             actionHost: new URL(action.url).host,
//             actionUrl: action.url,
//             originalUrl,
//             securityState: type,
//             isChained: action.isChained,
//             isSupported: await action.isSupported(),
//             isLiveData: action.liveData_experimental?.enabled ?? false,
//             wallet,
//             client: 'extension',
//           });
//         },
//       });
//     } else {
//       postHogClient?.capture('twitter_observer_init_failed', {
//         reason: 'no_wallet',
//       });
//     }
//   });
// }

// initTwitterObserver();

function initObservers(wallet: string) {
  const adapter = new ActionConfigWithAnalytics(
    new ActionConfig(import.meta.env.VITE_RPC_URL, {
      signTransaction: (tx: string) =>
        chrome.runtime.sendMessage({
          type: 'sign_transaction',
          wallet,
          payload: {
            txData: tx,
          },
        }),
      connect: () =>
        chrome.runtime.sendMessage({
          wallet,
          type: 'connect',
        }),
      metadata: {
        supportedBlockchainIds: [BlockchainIds.SOLANA_MAINNET],
      },
    }),
    wallet,
  );

  const callbacks = {
    onActionMount: async (
      action: Action,
      originalUrl: string,
      type: BlinkSecurityState,
    ) => {
      postHogClient?.capture('action_mount', {
        actionHost: new URL(action.url).host,
        actionUrl: action.url,
        originalUrl,
        securityState: type,
        isChained: action.isChained,
        isSupported: await action.isSupported(),
        isLiveData: action.liveData_experimental?.enabled ?? false,
        wallet,
        client: 'extension',
      });
    },
  };

  if (window.location.hostname.includes('reddit.com')) {
    injectRedditStyles();
    setupRedditObserver(adapter, callbacks);
  } else if (
    window.location.hostname.includes('twitter.com') ||
    window.location.hostname.includes('x.com')
  ) {
    setupTwitterObserver(adapter, callbacks);
  } else if (window.location.hostname.includes('mail.google.com')) {
    injectGmailStyles();
    setupGmailObserver(adapter, callbacks);
  } else if (window.location.hostname.includes('pinterest.com')) {
    injectPinterestStyles();
    setupPinterestObserver(adapter, callbacks);
  } else if (
    window.location.hostname.includes('t.me') ||
    window.location.hostname.includes('telegram.org')
  ) {
    injectTelegramStyles();
    setupTelegramObserver(adapter, callbacks);
  }
}

function initExtension() {
  chrome.runtime.sendMessage({ type: 'getSelectedWallet' }, (wallet) => {
    if (wallet) {
      postHogClient?.capture('observer_init_success', { wallet });
      initObservers(wallet);

      // Add a listener for URL changes
      let lastUrl = location.href;
      new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
          lastUrl = url;
          window.lastProcessedURL = url; // Update this line
          initObservers(wallet);
        }
      }).observe(document, { subtree: true, childList: true });
    } else {
      postHogClient?.capture('observer_init_failed', {
        reason: 'no_wallet',
      });
    }
  });
}

initExtension();

// Add this to handle page unload
window.addEventListener('beforeunload', () => {
  window.processedLinks = new Set();
  delete window.lastProcessedURL;
});
