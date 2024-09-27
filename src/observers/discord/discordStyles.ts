import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Discord's theme
export const getDiscordStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Discord
const discordStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #5865F2;
  --blink-button-disabled: #80848E;
  --blink-button-hover: #4752C4;
  --blink-button-success: #3BA55C;
  --blink-icon-error: #ED4245;
  --blink-icon-primary: #747F8D;
  --blink-icon-warning: #FAA61A;
  --blink-input-bg: #E3E5E8;
  --blink-input-stroke: #C7CCD1;
  --blink-input-stroke-selected: #5865F2;
  --blink-stroke-error: #ED4245;
  --blink-stroke-primary: #5865F2;
  --blink-stroke-secondary: #E3E5E8;
  --blink-stroke-warning: #FAA61A;
  --blink-text-brand: #5865F2;
  --blink-text-button: #ffffff;
  --blink-text-error: #ED4245;
  --blink-text-input: #2E3338;
  --blink-text-link: #00AFF4;
  --blink-text-primary: #2E3338;
  --blink-text-secondary: #747F8D;
  --blink-text-success: #3BA55C;
  --blink-text-warning: #FAA61A;

  --blink-border-radius-rounded-lg: 5px;
  --blink-border-radius-rounded-xl: 8px;
  --blink-border-radius-rounded-2xl: 12px;
  --blink-border-radius-rounded-button: 3px;
  --blink-border-radius-rounded-input: 3px;

  --blink-shadow-container: 0 1px 5px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #36393F;
  --blink-button: #5865F2;
  --blink-button-disabled: #4F545C;
  --blink-button-hover: #4752C4;
  --blink-button-success: #3BA55C;
  --blink-icon-error: #ED4245;
  --blink-icon-primary: #B9BBBE;
  --blink-icon-warning: #FAA61A;
  --blink-input-bg: #40444B;
  --blink-input-stroke: #202225;
  --blink-input-stroke-selected: #5865F2;
  --blink-stroke-error: #ED4245;
  --blink-stroke-primary: #5865F2;
  --blink-stroke-secondary: #2F3136;
  --blink-stroke-warning: #FAA61A;
  --blink-text-brand: #5865F2;
  --blink-text-button: #ffffff;
  --blink-text-error: #ED4245;
  --blink-text-input: #DCDDDE;
  --blink-text-link: #00AFF4;
  --blink-text-primary: #DCDDDE;
  --blink-text-secondary: #8E9297;
  --blink-text-success: #3BA55C;
  --blink-text-warning: #FAA61A;

  --blink-border-radius-rounded-lg: 5px;
  --blink-border-radius-rounded-xl: 8px;
  --blink-border-radius-rounded-2xl: 12px;
  --blink-border-radius-rounded-button: 3px;
  --blink-border-radius-rounded-input: 3px;

  --blink-shadow-container: 0 1px 5px rgba(0, 0, 0, 0.3);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 16px !important;
  line-height: 1.375rem !important;
  font-weight: 400 !important;
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
  margin-bottom: 8px !important;
}

.blink-button {
  padding: 2px 16px !important;
  min-height: 38px !important;
  min-width: 60px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 16px !important;
  text-transform: none !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
  transition: background-color .17s ease,color .17s ease !important;
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
  padding: 10px !important;
  font-size: 16px !important;
  line-height: 1.375rem !important;
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
export function injectDiscordStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = discordStyles;
  document.head.appendChild(styleElement);
}
