import { createRoot } from 'react-dom/client';
import './content.css';
import { ActionContainer } from './ActionContainer';
import { urls } from './data';

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
      const foundUrl = Object.keys(urls).find((url) =>
        tweetText?.textContent?.includes(url),
      );
      if (!foundUrl) {
        return;
      }
      tweetText?.parentElement?.appendChild(createAction(foundUrl));
    });
  });
});

observer.observe(twitterReactRoot, { childList: true, subtree: true });

function createAction(url: string) {
  const container = document.createElement('div');
  container.className = 'dialect-action-root-container';

  const actionRoot = createRoot(container);

  actionRoot.render(<ActionContainer content={urls[url]} />);

  return container;
}
