import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on TikTok's theme
export const getTikTokStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for TikTok
const tiktokStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #fe2c55;
  --blink-button-disabled: #f1f1f2;
  --blink-button-hover: #ef2950;
  --blink-button-success: #25f4ee;
  --blink-icon-error: #ff4d4f;
  --blink-icon-primary: #161823;
  --blink-icon-warning: #ffc069;
  --blink-input-bg: #f1f1f2;
  --blink-input-stroke: #d7d7d9;
  --blink-input-stroke-selected: #fe2c55;
  --blink-stroke-error: #ff4d4f;
  --blink-stroke-primary: #fe2c55;
  --blink-stroke-secondary: #f1f1f2;
  --blink-stroke-warning: #ffc069;
  --blink-text-brand: #fe2c55;
  --blink-text-button: #ffffff;
  --blink-text-error: #ff4d4f;
  --blink-text-input: #161823;
  --blink-text-link: #2f88ff;
  --blink-text-primary: #161823;
  --blink-text-secondary: #75767b;
  --blink-text-success: #25f4ee;
  --blink-text-warning: #ffc069;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #121212;
  --blink-button: #fe2c55;
  --blink-button-disabled: #2f2f2f;
  --blink-button-hover: #ef2950;
  --blink-button-success: #25f4ee;
  --blink-icon-error: #ff4d4f;
  --blink-icon-primary: #ffffff;
  --blink-icon-warning: #ffc069;
  --blink-input-bg: #2f2f2f;
  --blink-input-stroke: #484848;
  --blink-input-stroke-selected: #fe2c55;
  --blink-stroke-error: #ff4d4f;
  --blink-stroke-primary: #fe2c55;
  --blink-stroke-secondary: #2f2f2f;
  --blink-stroke-warning: #ffc069;
  --blink-text-brand: #fe2c55;
  --blink-text-button: #ffffff;
  --blink-text-error: #ff4d4f;
  --blink-text-input: #ffffff;
  --blink-text-link: #2f88ff;
  --blink-text-primary: #ffffff;
  --blink-text-secondary: #8a8b91;
  --blink-text-success: #25f4ee;
  --blink-text-warning: #ffc069;

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
  font-size: 16px !important;
  line-height: 22px !important;
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif !important;
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
  padding: 6px 16px !important;
  height: 36px !important;
  min-width: 96px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  text-transform: capitalize !important;
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
  font-size: 16px !important;
  line-height: 22px !important;
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
export function injectTikTokStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = tiktokStyles;
  document.head.appendChild(styleElement);
}
