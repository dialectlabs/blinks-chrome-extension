import '@dialectlabs/actions-ui/index.css';
import { setupTwitterObserver } from '@dialectlabs/actions-ui/ext/twitter';
import { ActionConfig } from '@dialectlabs/actions-ui';

const adapter = (wallet: string) =>
  new ActionConfig('https://leone-bglol6-fast-mainnet.helius-rpc.com', {
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
  });

function initTwitterObserver() {
  chrome.runtime.sendMessage({ type: 'getSelectedWallet' }, (wallet) => {
    if (wallet) {
      setupTwitterObserver(adapter(wallet));
    }
  });
}

initTwitterObserver();
