import '@dialectlabs/blinks/index.css';
import { setupTwitterObserver } from '@dialectlabs/blinks/ext/twitter';
import {
  ActionAdapter,
  ActionConfig,
  ActionContext,
  BlockchainIds,
  createSignMessageText,
  SignMessageData,
} from '@dialectlabs/blinks';
import postHogClient from './analytics';
import base58 from 'bs58';

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

  async signMessage(data: string | SignMessageData, context: ActionContext) {
    const triggeredUrlObj = new URL(context.triggeredLinkedAction.href);
    const analyticsParams = {
      originalUrl: context.originalUrl,
      actionHost: new URL(context.action.url).host,
      actionUrl: context.action.url,
      triggeredUrl: triggeredUrlObj.origin + triggeredUrlObj.pathname,
      triggeredLabel: context.triggeredLinkedAction.label,
      isForm: context.triggeredLinkedAction.parameters.length > 1,
      securityState: context.actionType,
      isChained: context.action.isChained,
      wallet: this.wallet,
      client: 'extension',
    };

    postHogClient?.capture('action_sign_message_initiated', analyticsParams);
    const result = await this.actionAdapter.signMessage(data, context);

    if ('signature' in result) {
      postHogClient?.capture('action_sign_message_success', analyticsParams);
    } else {
      postHogClient?.capture('action_sign_message_failed', analyticsParams);
    }
    return result;
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
      signMessage: async (data: string | SignMessageData) => {
        const message =
          typeof data === 'string' ? data : createSignMessageText(data);
        const result: { signature: number[] } | { error: string } =
          await chrome.runtime.sendMessage({
            type: 'sign_message',
            wallet,
            payload: {
              message,
            },
          });
        if (!('signature' in result)) {
          return result;
        }
        try {
          const encodedSignature = base58.encode(
            Uint8Array.from(result.signature),
          );
          return {
            signature: encodedSignature,
          };
        } catch (e) {
          console.error(e);
          return { error: 'Signing failed.' };
        }
      },
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

function initTwitterObserver() {
  chrome.runtime.sendMessage({ type: 'getSelectedWallet' }, (wallet) => {
    if (wallet) {
      postHogClient?.capture('twitter_observer_init_success', { wallet });
      setupTwitterObserver(adapter(wallet), {
        onActionMount: async (action, originalUrl, type) => {
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
      });
    } else {
      postHogClient?.capture('twitter_observer_init_failed', {
        reason: 'no_wallet',
      });
    }
  });
}

initTwitterObserver();
