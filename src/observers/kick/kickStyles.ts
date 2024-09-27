import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Kick's theme
export const getKickStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Kick
const kickStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #53fc18;
  --blink-button-disabled: #e5e5e5;
  --blink-button-hover: #4ae516;
  --blink-button-success: #53fc18;
  --blink-icon-error: #ff4d4f;
  --blink-icon-primary: #18181b;
  --blink-icon-warning: #faad14;
  --blink-input-bg: #f6f6f6;
  --blink-input-stroke: #d9d9d9;
  --blink-input-stroke-selected: #53fc18;
  --blink-stroke-error: #ff4d4f;
  --blink-stroke-primary: #53fc18;
  --blink-stroke-secondary: #e5e5e5;
  --blink-stroke-warning: #faad14;
  --blink-text-brand: #53fc18;
  --blink-text-button: #000000;
  --blink-text-error: #ff4d4f;
  --blink-text-input: #18181b;
  --blink-text-link: #53fc18;
  --blink-text-primary: #18181b;
  --blink-text-secondary: #6f6f6f;
  --blink-text-success: #53fc18;
  --blink-text-warning: #faad14;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #18181b;
  --blink-button: #53fc18;
  --blink-button-disabled: #3f3f46;
  --blink-button-hover: #4ae516;
  --blink-button-success: #53fc18;
  --blink-icon-error: #ff4d4f;
  --blink-icon-primary: #ffffff;
  --blink-icon-warning: #faad14;
  --blink-input-bg: #27272a;
  --blink-input-stroke: #3f3f46;
  --blink-input-stroke-selected: #53fc18;
  --blink-stroke-error: #ff4d4f;
  --blink-stroke-primary: #53fc18;
  --blink-stroke-secondary: #3f3f46;
  --blink-stroke-warning: #faad14;
  --blink-text-brand: #53fc18;
  --blink-text-button: #000000;
  --blink-text-error: #ff4d4f;
  --blink-text-input: #ffffff;
  --blink-text-link: #53fc18;
  --blink-text-primary: #ffffff;
  --blink-text-secondary: #a1a1aa;
  --blink-text-success: #53fc18;
  --blink-text-warning: #faad14;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 3px rgba(0, 0, 0, 0.2);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 14px !important;
  line-height: 1.5 !important;
  font-family: Inter, sans-serif !important;
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
  height: 36px !important;
  min-width: 80px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
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
  padding: 8px 12px !important;
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
export function injectKickStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = kickStyles;
  document.head.appendChild(styleElement);
}
