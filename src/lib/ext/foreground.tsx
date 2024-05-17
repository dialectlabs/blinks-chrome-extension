import { createRoot } from 'react-dom/client';
import './content.css';
import { ActionContainer } from '../shared/ui/ActionContainer';

const TRIGGER_WORD = 'drip.haus/sujipop';

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
      if (!tweetText?.textContent?.includes(TRIGGER_WORD)) {
        return;
      }
      tweetText?.parentElement?.appendChild(createAction());
    });
  });
});

observer.observe(twitterReactRoot, { childList: true, subtree: true });

function createAction() {
  const container = document.createElement('div');
  container.className = 'dialect-action-root-container';

  const actionRoot = createRoot(container);

  actionRoot.render(<ActionContainer />);

  return container;
}
