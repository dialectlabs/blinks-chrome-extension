import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Google Docs' theme
export const getDocsStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Google Docs
const docsStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #1a73e8;
  --blink-button-disabled: #dadce0;
  --blink-button-hover: #185abc;
  --blink-button-success: #1e8e3e;
  --blink-icon-error: #d93025;
  --blink-icon-primary: #5f6368;
  --blink-icon-warning: #f9ab00;
  --blink-input-bg: #f1f3f4;
  --blink-input-stroke: #dadce0;
  --blink-input-stroke-selected: #1a73e8;
  --blink-stroke-error: #d93025;
  --blink-stroke-primary: #1a73e8;
  --blink-stroke-secondary: #dadce0;
  --blink-stroke-warning: #f9ab00;
  --blink-text-brand: #1a73e8;
  --blink-text-button: #ffffff;
  --blink-text-error: #d93025;
  --blink-text-input: #202124;
  --blink-text-link: #1a73e8;
  --blink-text-primary: #202124;
  --blink-text-secondary: #5f6368;
  --blink-text-success: #1e8e3e;
  --blink-text-warning: #f9ab00;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 8px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 2px 0 rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15);
}

.blink.x-dark {
  --blink-bg-primary: #202124;
  --blink-button: #8ab4f8;
  --blink-button-disabled: #5f6368;
  --blink-button-hover: #aecbfa;
  --blink-button-success: #81c995;
  --blink-icon-error: #f28b82;
  --blink-icon-primary: #e8eaed;
  --blink-icon-warning: #fdd663;
  --blink-input-bg: #303134;
  --blink-input-stroke: #5f6368;
  --blink-input-stroke-selected: #8ab4f8;
  --blink-stroke-error: #f28b82;
  --blink-stroke-primary: #8ab4f8;
  --blink-stroke-secondary: #5f6368;
  --blink-stroke-warning: #fdd663;
  --blink-text-brand: #8ab4f8;
  --blink-text-button: #202124;
  --blink-text-error: #f28b82;
  --blink-text-input: #e8eaed;
  --blink-text-link: #8ab4f8;
  --blink-text-primary: #e8eaed;
  --blink-text-secondary: #9aa0a6;
  --blink-text-success: #81c995;
  --blink-text-warning: #fdd663;

  --blink-border-radius-rounded-lg: 4px;
  --blink-border-radius-rounded-xl: 8px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 4px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 2px 0 rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 11pt !important;
  line-height: 1.5 !important;
  font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif !important;
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
  padding: 0 24px !important;
  height: 36px !important;
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
  padding: 8px 12px !important;
  font-size: 14px !important;
  line-height: 20px !important;
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
export function injectDocsStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = docsStyles;
  document.head.appendChild(styleElement);
}
