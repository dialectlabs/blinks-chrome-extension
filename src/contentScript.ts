import '@dialectlabs/actions-ui/index.css';
import { setupTwitterObserver } from '@dialectlabs/actions-ui/ext/twitter';
import { ActionConfig } from '@dialectlabs/actions-ui';

const adapter = new ActionConfig('https://leone-bglol6-fast-mainnet.helius-rpc.com', {
  signTransaction: (tx: string) =>
    chrome.runtime.sendMessage({
      type: 'sign_transaction',
      payload: {
        txData: tx,
      },
    }),
  connect: () =>
    chrome.runtime.sendMessage({
      type: 'connect',
    }),
});

setupTwitterObserver(adapter);
