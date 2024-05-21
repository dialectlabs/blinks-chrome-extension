import { createRoot } from 'react-dom/client';
import { ActionContainer } from '../shared/ui/ActionContainer';
import './content.css';
import { ActionsConfig, ActionsURLMapper } from '../shared/utils/url-mapper';
import { noop } from '../shared/utils/constants';

export function setupTwitterObserver() {
  const twitterReactRoot = document.getElementById('react-root')!;

  // entrypoint
  const observer = new MutationObserver((mutations) => {
    // it's fast to iterate like this
    for (let i = 0; i < mutations.length; i++) {
      const mutation = mutations[i];
      for (let j = 0; j < mutation.addedNodes.length; j++) {
        const node = mutation.addedNodes[j];
        if (node.nodeType !== Node.ELEMENT_NODE) {
          return;
        }
        handleNewNode(node as Element).catch(noop);
      }
    }
  });

  observer.observe(twitterReactRoot, { childList: true, subtree: true });
}

async function handleNewNode(node: Element) {
  const element = node as Element;
  // first quick filtration
  if (!element || element.localName !== 'div') {
    return;
  }
  const rootElement = findElementByTestId(element, 'card.wrapper');
  if (!rootElement) {
    return;
  }
  // handle link preview only, assuming that link preview is a must for actions
  const linkPreview = rootElement.children[0] as HTMLDivElement;
  if (!linkPreview) {
    return;
  }
  const anchor = linkPreview.children[0] as HTMLAnchorElement;
  const shortenedUrl = anchor.href;
  const actionUrl = await resolveTwitterShortenedUrl(shortenedUrl);
  const actionsJson = await fetch(actionUrl.origin + '/actions.json').then(
    (res) => res.json() as Promise<ActionsConfig>,
  );

  const actionsUrlMapper = new ActionsURLMapper(actionsJson);

  const actionApiUrl = actionsUrlMapper.mapUrl(actionUrl);

  console.log('found action api url', actionApiUrl);

  if (!actionApiUrl) {
    return;
  }

  rootElement.parentElement?.replaceChildren(createAction(actionApiUrl));
}

function createAction(apiUrl: string) {
  const container = document.createElement('div');
  container.className = 'dialect-action-root-container';

  const actionRoot = createRoot(container);

  actionRoot.render(<ActionContainer />);

  return container;
}

async function resolveTwitterShortenedUrl(shortenedUrl: string): Promise<URL> {
  const res = await fetch(shortenedUrl);
  const html = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const actionUrl = doc.querySelector('title')?.textContent;
  return new URL(actionUrl!);
}

function findElementByTestId(element: Element, testId: string) {
  if (element.attributes.getNamedItem('data-testid')?.value === testId) {
    return element;
  }
  return element.querySelector(`[data-testid="${testId}"]`);
}
