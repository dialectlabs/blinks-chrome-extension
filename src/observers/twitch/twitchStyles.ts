import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Twitch's theme
export const getTwitchStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Twitch
const twitchStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #9147ff;
  --blink-button-disabled: #dedee3;
  --blink-button-hover: #772ce8;
  --blink-button-success: #00db74;
  --blink-icon-error: #e91916;
  --blink-icon-primary: #53535f;
  --blink-icon-warning: #ffb81c;
  --blink-input-bg: #f7f7f8;
  --blink-input-stroke: #dedee3;
  --blink-input-stroke-selected: #9147ff;
  --blink-stroke-error: #e91916;
  --blink-stroke-primary: #9147ff;
  --blink-stroke-secondary: #dedee3;
  --blink-stroke-warning: #ffb81c;
  --blink-text-brand: #9147ff;
  --blink-text-button: #ffffff;
  --blink-text-error: #e91916;
  --blink-text-input: #0e0e10;
  --blink-text-link: #9147ff;
  --blink-text-primary: #0e0e10;
  --blink-text-secondary: #53535f;
  --blink-text-success: #00db74;
  --blink-text-warning: #ffb81c;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 6px;
  --blink-border-radius-rounded-2xl: 8px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.blink.x-dark {
  --blink-bg-primary: #0e0e10;
  --blink-button: #9147ff;
  --blink-button-disabled: #3a3a3d;
  --blink-button-hover: #772ce8;
  --blink-button-success: #00db74;
  --blink-icon-error: #e91916;
  --blink-icon-primary: #efeff1;
  --blink-icon-warning: #ffb81c;
  --blink-input-bg: #18181b;
  --blink-input-stroke: #3a3a3d;
  --blink-input-stroke-selected: #9147ff;
  --blink-stroke-error: #e91916;
  --blink-stroke-primary: #9147ff;
  --blink-stroke-secondary: #3a3a3d;
  --blink-stroke-warning: #ffb81c;
  --blink-text-brand: #9147ff;
  --blink-text-button: #ffffff;
  --blink-text-error: #e91916;
  --blink-text-input: #efeff1;
  --blink-text-link: #bf94ff;
  --blink-text-primary: #efeff1;
  --blink-text-secondary: #adadb8;
  --blink-text-success: #00db74;
  --blink-text-warning: #ffb81c;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 6px;
  --blink-border-radius-rounded-2xl: 8px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 4px 6px rgba(0, 0, 0, 0.2);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 13px !important;
  line-height: 1.5 !important;
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}

.blink {
  width: 100% !important;
  box-sizing: border-box !important;
}

.blink-container {
  padding: 10px !important;
  border-radius: var(--blink-border-radius-rounded-lg) !important;
  background-color: var(--blink-bg-primary) !important;
  border: 1px solid var(--blink-stroke-secondary) !important;
  box-shadow: var(--blink-shadow-container) !important;
}

.blink-header, .blink-body, .blink-footer {
  margin-bottom: 8px !important;
}

.blink-button {
  padding: 5px 10px !important;
  min-height: 30px !important;
  min-width: 40px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
  transition: background-color 0.1s ease !important;
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
  padding: 5px 10px !important;
  font-size: 13px !important;
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
export function injectTwitchStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = twitchStyles;
  document.head.appendChild(styleElement);
}
