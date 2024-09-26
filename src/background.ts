import base58 from 'bs58';
import { Buffer } from 'buffer';
import { TipLinkWalletAdapter } from '@tiplink/wallet-adapter';

// Initialize TipLink adapter
const tipLinkAdapter = new TipLinkWalletAdapter({
  title: 'ClickCrate Extension',
  clientId: 'f4856b33-38fd-4902-8094-4174a85edbbd',
  theme: 'dark',
});

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('on message', msg, sender);
  if (!sender.tab || !sender.tab.id) {
    return null;
  }
  if (msg.type === 'getSelectedWallet') {
    chrome.storage.local.get(['selectedWallet'], (storage) => {
      sendResponse(storage.selectedWallet);
    });
    return true;
  }

  if (!msg.wallet) return false;
  handleWalletCommunication(sender.tab.id, msg.type, msg.wallet, msg.payload)
    .then((res) => {
      sendResponse(res);
    })
    .catch((err) => {
      console.error('error handling message', err);
      sendResponse({ error: err.message });
    });

  return true;
});

async function handleWalletCommunication(
  tabId: number,
  type: string,
  wallet: string,
  payload: any,
) {
  if (wallet === 'tiplink') {
    return handleTipLinkCommunication(type, payload);
  } else {
    return handleExistingWalletCommunication(tabId, type, wallet, payload);
  }
}

async function handleTipLinkCommunication(type: string, payload: any) {
  switch (type) {
    case 'connect':
      try {
        await tipLinkAdapter.connect();
        return tipLinkAdapter.publicKey?.toString();
      } catch (error) {
        console.error('TipLink connect error:', error);
        throw new Error('Failed to connect TipLink wallet');
      }
    case 'sign_transaction':
      try {
        // const transaction = base58.encode(
        //   Buffer.from(payload.txData, 'base64'),
        // );
        const signedTx = await tipLinkAdapter.signTransaction(payload.txData);
        // You might need to adjust this part depending on how TipLink handles transaction signing and sending
        return { signature: 'simulated_signature_for_tiplink' };
      } catch (error) {
        console.error('TipLink sign transaction error:', error);
        throw new Error('Failed to sign transaction with TipLink');
      }
    default:
      throw new Error(`Unsupported operation type for TipLink: ${type}`);
  }
}

async function handleExistingWalletCommunication(
  tabId: number,
  type: string,
  wallet: string,
  payload: any,
) {
  if (type === 'connect') {
    console.log('connecting wallet', wallet);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func:
        wallet === 'solflare'
          ? async () => {
              // @ts-ignore
              const provider = window.solflare;
              const res = await provider.connect();
              return provider.publicKey.toString();
            }
          : async () => {
              // @ts-ignore
              const provider = window.solana;
              const res = await provider.connect();
              return res.publicKey.toString();
            },
    });
    return res[0].result;
  } else if (type === 'sign_message') {
    console.log('signing message', payload.message);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func: async (message: string, walletType: string) => {
        const provider =
          // @ts-ignore
          walletType === 'solflare' ? window.solflare : window.solana;
        const textToSign = new TextEncoder().encode(message);
        const res = await provider.signMessage(textToSign);
        return res;
      },
      args: [payload.message, wallet],
    });
    return res[0].result;
  } else if (type === 'sign_transaction') {
    console.log('signing transaction', wallet, payload.txData);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func: async (transaction: string, walletType: string) => {
        try {
          const res =
            walletType === 'solflare'
              ? // @ts-ignore
                await window.solflare.request({
                  method: 'signAndSendTransaction',
                  params: {
                    transaction,
                  },
                })
              : // @ts-ignore
                await window.solana.request({
                  method: 'signAndSendTransaction',
                  params: {
                    message: transaction,
                  },
                });
          console.log('result', res);
          return res;
        } catch (e: any) {
          console.log('error', e);
          return { error: e.message ?? 'Unknown error' };
        }
      },
      args: [base58.encode(Buffer.from(payload.txData, 'base64')), wallet],
    });
    return res[0].result;
  }
  throw new Error(`Unsupported operation type: ${type}`);
}
