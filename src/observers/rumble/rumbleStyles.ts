import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Rumble's theme
export const getRumbleStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Rumble
const rumbleStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #85bd3c;
  --blink-button-disabled: #cccccc;
  --blink-button-hover: #74a535;
  --blink-button-success: #85bd3c;
  --blink-icon-error: #d9534f;
  --blink-icon-primary: #333333;
  --blink-icon-warning: #f0ad4e;
  --blink-input-bg: #f8f8f8;
  --blink-input-stroke: #cccccc;
  --blink-input-stroke-selected: #85bd3c;
  --blink-stroke-error: #d9534f;
  --blink-stroke-primary: #85bd3c;
  --blink-stroke-secondary: #e5e5e5;
  --blink-stroke-warning: #f0ad4e;
  --blink-text-brand: #85bd3c;
  --blink-text-button: #ffffff;
  --blink-text-error: #d9534f;
  --blink-text-input: #333333;
  --blink-text-link: #337ab7;
  --blink-text-primary: #333333;
  --blink-text-secondary: #777777;
  --blink-text-success: #85bd3c;
  --blink-text-warning: #f0ad4e;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 6px;
  --blink-border-radius-rounded-2xl: 8px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #1a1a1a;
  --blink-button: #85bd3c;
  --blink-button-disabled: #4d4d4d;
  --blink-button-hover: #74a535;
  --blink-button-success: #85bd3c;
  --blink-icon-error: #d9534f;
  --blink-icon-primary: #ffffff;
  --blink-icon-warning: #f0ad4e;
  --blink-input-bg: #2a2a2a;
  --blink-input-stroke: #4d4d4d;
  --blink-input-stroke-selected: #85bd3c;
  --blink-stroke-error: #d9534f;
  --blink-stroke-primary: #85bd3c;
  --blink-stroke-secondary: #4d4d4d;
  --blink-stroke-warning: #f0ad4e;
  --blink-text-brand: #85bd3c;
  --blink-text-button: #ffffff;
  --blink-text-error: #d9534f;
  --blink-text-input: #ffffff;
  --blink-text-link: #5bc0de;
  --blink-text-primary: #ffffff;
  --blink-text-secondary: #b3b3b3;
  --blink-text-success: #85bd3c;
  --blink-text-warning: #f0ad4e;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 6px;
  --blink-border-radius-rounded-2xl: 8px;
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
  font-family: Arial, sans-serif !important;
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
export function injectRumbleStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = rumbleStyles;
  document.head.appendChild(styleElement);
}
