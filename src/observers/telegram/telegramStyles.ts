import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Telegram's theme
export const getTelegramStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Telegram
const telegramStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #3390ec;
  --blink-button-disabled: #c4c9cc;
  --blink-button-hover: #50a8eb;
  --blink-button-success: #31b545;
  --blink-icon-error: #e53935;
  --blink-icon-primary: #707579;
  --blink-icon-warning: #f5a623;
  --blink-input-bg: #f1f3f4;
  --blink-input-stroke: #dadce0;
  --blink-input-stroke-selected: #3390ec;
  --blink-stroke-error: #e53935;
  --blink-stroke-primary: #3390ec;
  --blink-stroke-secondary: #e6ebee;
  --blink-stroke-warning: #f5a623;
  --blink-text-brand: #3390ec;
  --blink-text-button: #ffffff;
  --blink-text-error: #e53935;
  --blink-text-input: #000000;
  --blink-text-link: #3390ec;
  --blink-text-primary: #000000;
  --blink-text-secondary: #707579;
  --blink-text-success: #31b545;
  --blink-text-warning: #f5a623;

  --blink-border-radius-rounded-lg: 12px;
  --blink-border-radius-rounded-xl: 16px;
  --blink-border-radius-rounded-2xl: 20px;
  --blink-border-radius-rounded-button: 8px;
  --blink-border-radius-rounded-input: 8px;

  --blink-shadow-container: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.blink.x-dark {
  --blink-bg-primary: #212121;
  --blink-button: #3390ec;
  --blink-button-disabled: #464646;
  --blink-button-hover: #50a8eb;
  --blink-button-success: #31b545;
  --blink-icon-error: #e53935;
  --blink-icon-primary: #aaaaaa;
  --blink-icon-warning: #f5a623;
  --blink-input-bg: #2c2c2c;
  --blink-input-stroke: #3d3d3d;
  --blink-input-stroke-selected: #3390ec;
  --blink-stroke-error: #e53935;
  --blink-stroke-primary: #3390ec;
  --blink-stroke-secondary: #303030;
  --blink-stroke-warning: #f5a623;
  --blink-text-brand: #3390ec;
  --blink-text-button: #ffffff;
  --blink-text-error: #e53935;
  --blink-text-input: #ffffff;
  --blink-text-link: #3390ec;
  --blink-text-primary: #ffffff;
  --blink-text-secondary: #aaaaaa;
  --blink-text-success: #31b545;
  --blink-text-warning: #f5a623;

  --blink-border-radius-rounded-lg: 12px;
  --blink-border-radius-rounded-xl: 16px;
  --blink-border-radius-rounded-2xl: 20px;
  --blink-border-radius-rounded-button: 8px;
  --blink-border-radius-rounded-input: 8px;

  --blink-shadow-container: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Additional styles to ensure consistent rendering in Telegram */
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
  padding: 8px 16px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  text-transform: none !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
}
`;

// Function to inject styles into the page
export function injectTelegramStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = telegramStyles;
  document.head.appendChild(styleElement);
}
