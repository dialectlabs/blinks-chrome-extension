import base58 from 'bs58';
import { Buffer } from 'buffer';

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('on message', msg, sender);
  if (!sender.tab || !sender.tab.id) {
    return null;
  }
  chrome.storage.local.get(['selectedWallet'], (storage) => {
    handleWalletCommunication(
      sender.tab.id,
      msg.type,
      //TODO return if no selected wallet
      storage.selectedWallet ?? 'default',
      msg.payload,
    )
      .then((res) => {
        sendResponse(res);
      })
      .catch((err) => {
        console.error('error handling message', err);
      });
  });

  return true;
});

async function handleWalletCommunication(
  tabId: number,
  type: string,
  wallet: string,
  payload: object,
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
    // } else if (type === 'sign_message') {
    //   // @ts-ignore
    //   console.log('signing message', payload.message);
    //   const res = await chrome.scripting.executeScript({
    //     world: 'MAIN',
    //     target: { tabId: tabId },
    //     func: async (message: string) => {
    //       // @ts-ignore
    //       const provider = window.solana;
    //       const textToSign = new TextEncoder().encode(message);
    //       const res = await provider.signMessage(textToSign);
    //       return res;
    //     },
    //     // @ts-ignore
    //     args: [payload.message],
    //   });
    //   return res[0].result;
  } else if (type === 'sign_transaction') {
    // @ts-ignore
    console.log('signing transaction', wallet, payload.txData);
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func: async (transaction: string, wallet) => {
        try {
          const res =
            wallet === 'solflare'
              ? // @ts-ignore
                await window.soflare.request({
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
      // @ts-ignore
      args: [base58.encode(Buffer.from(payload.txData, 'base64')), wallet],
    });
    return res[0].result;
  }
}
