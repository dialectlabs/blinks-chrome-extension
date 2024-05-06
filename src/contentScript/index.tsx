import { createRoot } from 'react-dom/client';

const twitterReactRoot = document.getElementById('react-root')!;

// entrypoint
const observer = new MutationObserver((mutations) => {
  // populate all tweets with buttons
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }
      const element = node as Element;
      if (
        !element ||
        element.localName !== 'div' ||
        element.attributes.getNamedItem('data-testid')?.value !== 'cellInnerDiv'
      ) {
        return;
      }

      const tweetText = element.querySelector('[data-testid="tweetText"]');
      console.log('tweetText', tweetText?.textContent);
      tweetText?.parentElement?.appendChild(createButton());
    });
  });
});

observer.observe(twitterReactRoot, { childList: true, subtree: true });

function createButton() {
  console.log('createButton');
  const buttonContainer = document.createElement('div');

  const buttonRoot = createRoot(buttonContainer);

  buttonRoot.render(
    <>
      <button
        onClick={async () => {
          const res = await chrome.runtime.sendMessage({ type: 'connect' });
          console.log('button on click', res);
          const signedMsg = await chrome.runtime.sendMessage({
            type: 'sign_message',
            payload: { message: 'hello' },
          });
          console.log('signed message', signedMsg);
        }}
      >
        TEST BUTTON FROM DIALECT
      </button>
    </>,
  );

  return buttonContainer;
}
