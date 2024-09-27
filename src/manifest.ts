import { defineManifest } from '@crxjs/vite-plugin';
import packageData from '../package.json';

const isDev = process.env.NODE_ENV == 'development';

export default defineManifest({
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-32.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-48.png',
  },
  background: {
    service_worker: 'src/background.ts',
    type: 'module',
  },
  content_scripts: [
    {
      matches: [
        'https://twitter.com/*',
        'https://x.com/*',
        'https://pro.x.com/*',
        'https://www.reddit.com/*',
        'https://old.reddit.com/*',
        'https://mail.google.com/*',
      ],
      js: ['src/contentScript.ts'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'img/logo-16.png',
        'img/logo-32.png',
        'img/logo-48.png',
        'img/logo-128.png',
        'provider.js',
      ],
      matches: ['<all_urls>'],
    },
  ],
  permissions: ['storage', 'activeTab', 'scripting'],
  host_permissions: [
    'https://twitter.com/*',
    'https://x.com/*',
    'https://pro.x.com/*',
    'https://www.reddit.com/*',
    'https://old.reddit.com/*',
    'https://mail.google.com/*',
  ],
});
