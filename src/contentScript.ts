import '@dialectlabs/blinks/index.css';
import { setupTwitterObserver } from '@dialectlabs/blinks/ext/twitter';
import { ActionConfig, BlockchainIds } from '@dialectlabs/blinks';

const adapter = (wallet: string) =>
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
  });

function initTwitterObserver() {
  chrome.runtime.sendMessage({ type: 'getSelectedWallet' }, (wallet) => {
    if (wallet) {
      setupTwitterObserver(adapter(wallet));
    }
  });
}

initTwitterObserver();
