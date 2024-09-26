import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Reddit's dark mode
export const getRedditStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles to your CSS
const redditStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #D93900;
  --blink-button-disabled: #545452;
  --blink-button-hover: #AE2C01;
  --blink-button-success: #5ad427;
  --blink-icon-error: #ff4500;
  --blink-icon-primary: #878a8c;
  --blink-icon-warning: #ffa500;
  --blink-input-bg: #f6f7f8;
  --blink-input-stroke: #edeff1;
  --blink-stroke-error: #ff4500;
  --blink-stroke-primary: #FF5700;
  --blink-stroke-secondary: #edeff1;
  --blink-stroke-warning: #ffa500;
  --blink-text-brand: #0079d3;
  --blink-text-button: #ffffff;
  --blink-text-error: #ff4500;
  --blink-text-input: #1c1c1c;
  --blink-text-link: #737373;
  --blink-text-primary: #1c1c1c;
  --blink-text-secondary: #7c7c7c;
  --blink-text-success: #46d160;
  --blink-text-warning: #ffa500;

  --blink-border-radius-rounded-lg: 0.25rem;
  --blink-border-radius-rounded-xl: 0.5rem;
  --blink-border-radius-rounded-2xl: 1.125rem;
  --blink-border-radius-rounded-button: 624.9375rem;
  --blink-border-radius-rounded-input: 624.9375rem;

  --blink-shadow-container: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

.blink.x-dark {
  --blink-bg-primary: #1a1a1b;
  --blink-button: #D93900;
  --blink-button-disabled: #545452;
  --blink-button-hover: #AE2C01;
  --blink-button-success: #46d160;
  --blink-icon-error: #ff4500;
  --blink-icon-primary: #818384;
  --blink-icon-warning: #ffa500;
  --blink-input-bg: #272729;
  --blink-input-stroke: #343536;
  --blink-stroke-error: #ff4500;
  --blink-stroke-primary: #FF5700;
  --blink-stroke-secondary: #343536;
  --blink-stroke-warning: #ffa500;
  --blink-text-brand: #4fbcff;
  --blink-text-button: #1a1a1b;
  --blink-text-error: #ff4500;
  --blink-text-input: #d7dadc;
  --blink-text-link: #6e767d;
  --blink-text-primary: #d7dadc;
  --blink-text-secondary: #818384;
  --blink-text-success: #46d160;
  --blink-text-warning: #ffa500;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 8px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 9999px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 14px !important;
  line-height: 1.4 !important;
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
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 12px !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
}
`;

// Function to inject styles into the page
export function injectRedditStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = redditStyles;
  document.head.appendChild(styleElement);
}
