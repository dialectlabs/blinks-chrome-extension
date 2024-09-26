/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

declare global {
  interface Window {
    processedLinks: Set<string>;
    lastProcessedURL?: string;
  }
}

export {};
