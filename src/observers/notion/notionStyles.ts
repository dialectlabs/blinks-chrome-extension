import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Notion's theme
export const getNotionStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Notion
const notionStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #2eaadc;
  --blink-button-disabled: #e5e5e5;
  --blink-button-hover: #2795c2;
  --blink-button-success: #0f7b6c;
  --blink-icon-error: #eb5757;
  --blink-icon-primary: #37352f;
  --blink-icon-warning: #f2994a;
  --blink-input-bg: #f7f6f3;
  --blink-input-stroke: #e5e5e5;
  --blink-input-stroke-selected: #2eaadc;
  --blink-stroke-error: #eb5757;
  --blink-stroke-primary: #2eaadc;
  --blink-stroke-secondary: #e5e5e5;
  --blink-stroke-warning: #f2994a;
  --blink-text-brand: #2eaadc;
  --blink-text-button: #ffffff;
  --blink-text-error: #eb5757;
  --blink-text-input: #37352f;
  --blink-text-link: #2eaadc;
  --blink-text-primary: #37352f;
  --blink-text-secondary: #9b9a97;
  --blink-text-success: #0f7b6c;
  --blink-text-warning: #f2994a;

  --blink-border-radius-rounded-lg: 3px;
  --blink-border-radius-rounded-xl: 5px;
  --blink-border-radius-rounded-2xl: 8px;
  --blink-border-radius-rounded-button: 3px;
  --blink-border-radius-rounded-input: 3px;

  --blink-shadow-container: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #191919;
  --blink-button: #2eaadc;
  --blink-button-disabled: #4d4d4d;
  --blink-button-hover: #2795c2;
  --blink-button-success: #0f7b6c;
  --blink-icon-error: #eb5757;
  --blink-icon-primary: #ffffff;
  --blink-icon-warning: #f2994a;
  --blink-input-bg: #2f3437;
  --blink-input-stroke: #4d4d4d;
  --blink-input-stroke-selected: #2eaadc;
  --blink-stroke-error: #eb5757;
  --blink-stroke-primary: #2eaadc;
  --blink-stroke-secondary: #4d4d4d;
  --blink-stroke-warning: #f2994a;
  --blink-text-brand: #2eaadc;
  --blink-text-button: #ffffff;
  --blink-text-error: #eb5757;
  --blink-text-input: #ffffff;
  --blink-text-link: #2eaadc;
  --blink-text-primary: #ffffff;
  --blink-text-secondary: #999999;
  --blink-text-success: #0f7b6c;
  --blink-text-warning: #f2994a;

  --blink-border-radius-rounded-lg: 3px;
  --blink-border-radius-rounded-xl: 5px;
  --blink-border-radius-rounded-2xl: 8px;
  --blink-border-radius-rounded-button: 3px;
  --blink-border-radius-rounded-input: 3px;

  --blink-shadow-container: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, "Apple Color Emoji", Arial, sans-serif, "Segoe UI Emoji", "Segoe UI Symbol" !important;
}

.blink {
  width: 100% !important;
  box-sizing: border-box !important;
}

.blink-container {
  padding: 12px !important;
  border-radius: var(--blink-border-radius-rounded-lg) !important;
  background-color: var(--blink-bg-primary) !important;
  border: 1px solid var(--blink-stroke-secondary) !important;
  box-shadow: var(--blink-shadow-container) !important;
}

.blink-header, .blink-body, .blink-footer {
  margin-bottom: 8px !important;
}

.blink-button {
  padding: 6px 12px !important;
  height: 32px !important;
  min-width: 80px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  text-transform: none !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
  transition: background-color 0.2s ease !important;
}

.blink-button:hover {
  background-color: var(--blink-button-hover) !important;
}

.blink-button:disabled {
  background-color: var(--blink-button-disabled) !important;
  cursor: not-allowed !important;
}

.blink-input {
  background-color: var(--blink-input-bg) !important;
  border: 1px solid var(--blink-input-stroke) !important;
  border-radius: var(--blink-border-radius-rounded-input) !important;
  color: var(--blink-text-input) !important;
  padding: 6px 10px !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
}

.blink-input:focus {
  border-color: var(--blink-input-stroke-selected) !important;
  outline: none !important;
}

.blink-link {
  color: var(--blink-text-link) !important;
  text-decoration: none !important;
}

.blink-link:hover {
  text-decoration: underline !important;
}
`;

// Function to inject styles into the page
export function injectNotionStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = notionStyles;
  document.head.appendChild(styleElement);
}
