chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log('on message', msg, sender);

  if (!sender.tab || !sender.tab.id) {
    return null;
  }

  handleWalletCommunication(sender.tab.id, msg.type, msg.payload)
    .then((res) => {
      sendResponse(res);
    })
    .catch((err) => {
      console.error('error handling message', err);
    });

  return true;
});

async function handleWalletCommunication(
  tabId: number,
  type: string,
  payload: object,
) {
  if (type === 'connect') {
    const res = await chrome.scripting.executeScript({
      world: 'MAIN',
      target: { tabId: tabId },
      func: async () => {
        const provider = window.phantom.solana;
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
      func: async (message: string) => {
        const provider = window.phantom.solana;
        const textToSign = new TextEncoder().encode(message);
        const res = await provider.signMessage(textToSign);
        return res;
      },
      args: [payload.message],
    });
    return res[0].result;
  }
}
