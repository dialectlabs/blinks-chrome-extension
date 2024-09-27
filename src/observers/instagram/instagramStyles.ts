import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Instagram's theme
export const getInstagramStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Instagram
const instagramStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #0095f6;
  --blink-button-disabled: #b2dffc;
  --blink-button-hover: #1877f2;
  --blink-button-success: #00c853;
  --blink-icon-error: #ed4956;
  --blink-icon-primary: #262626;
  --blink-icon-warning: #fca326;
  --blink-input-bg: #fafafa;
  --blink-input-stroke: #dbdbdb;
  --blink-input-stroke-selected: #0095f6;
  --blink-stroke-error: #ed4956;
  --blink-stroke-primary: #0095f6;
  --blink-stroke-secondary: #dbdbdb;
  --blink-stroke-warning: #fca326;
  --blink-text-brand: #0095f6;
  --blink-text-button: #ffffff;
  --blink-text-error: #ed4956;
  --blink-text-input: #262626;
  --blink-text-link: #00376b;
  --blink-text-primary: #262626;
  --blink-text-secondary: #8e8e8e;
  --blink-text-success: #00c853;
  --blink-text-warning: #fca326;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #000000;
  --blink-button: #0095f6;
  --blink-button-disabled: #004c8b;
  --blink-button-hover: #1877f2;
  --blink-button-success: #00c853;
  --blink-icon-error: #ed4956;
  --blink-icon-primary: #ffffff;
  --blink-icon-warning: #fca326;
  --blink-input-bg: #262626;
  --blink-input-stroke: #363636;
  --blink-input-stroke-selected: #0095f6;
  --blink-stroke-error: #ed4956;
  --blink-stroke-primary: #0095f6;
  --blink-stroke-secondary: #363636;
  --blink-stroke-warning: #fca326;
  --blink-text-brand: #0095f6;
  --blink-text-button: #ffffff;
  --blink-text-error: #ed4956;
  --blink-text-input: #ffffff;
  --blink-text-link: #e0f1ff;
  --blink-text-primary: #ffffff;
  --blink-text-secondary: #8e8e8e;
  --blink-text-success: #00c853;
  --blink-text-warning: #fca326;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 2px 12px rgba(255, 255, 255, 0.1);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 14px !important;
  line-height: 18px !important;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
}

.blink {
  width: 100% !important;
  box-sizing: border-box !important;
}

.blink-container {
  padding: 16px !important;
  border-radius: var(--blink-border-radius-rounded-lg) !important;
  background-color: var(--blink-bg-primary) !important;
  border: 1px solid var(--blink-stroke-secondary) !important;
  box-shadow: var(--blink-shadow-container) !important;
}

.blink-header, .blink-body, .blink-footer {
  margin-bottom: 12px !important;
}

.blink-button {
  padding: 5px 9px !important;
  height: 30px !important;
  min-width: 80px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 600 !important;
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
  padding: 4px 8px !important;
  font-size: 14px !important;
  line-height: 18px !important;
}

.blink-input:focus {
  border-color: var(--blink-input-stroke-selected) !important;
  outline: none !important;
}

.blink-link {
  color: var(--blink-text-link) !important;
  text-decoration: none !important;
  font-weight: 600 !important;
}

.blink-link:hover {
  text-decoration: underline !important;
}
`;

// Function to inject styles into the page
export function injectInstagramStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = instagramStyles;
  document.head.appendChild(styleElement);
}
