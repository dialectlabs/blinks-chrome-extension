import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on YouTube's theme
export const getYoutubeStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for YouTube
const youtubeStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #065fd4;
  --blink-button-disabled: #909090;
  --blink-button-hover: #0b57d0;
  --blink-button-success: #2ba640;
  --blink-icon-error: #ff0000;
  --blink-icon-primary: #606060;
  --blink-icon-warning: #ff8c00;
  --blink-input-bg: #f8f8f8;
  --blink-input-stroke: #909090;
  --blink-input-stroke-selected: #065fd4;
  --blink-stroke-error: #ff0000;
  --blink-stroke-primary: #065fd4;
  --blink-stroke-secondary: #e5e5e5;
  --blink-stroke-warning: #ff8c00;
  --blink-text-brand: #065fd4;
  --blink-text-button: #ffffff;
  --blink-text-error: #ff0000;
  --blink-text-input: #0f0f0f;
  --blink-text-link: #065fd4;
  --blink-text-primary: #0f0f0f;
  --blink-text-secondary: #606060;
  --blink-text-success: #2ba640;
  --blink-text-warning: #ff8c00;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 18px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #0f0f0f;
  --blink-button: #3ea6ff;
  --blink-button-disabled: #717171;
  --blink-button-hover: #65b8ff;
  --blink-button-success: #2ba640;
  --blink-icon-error: #ff4e45;
  --blink-icon-primary: #aaa;
  --blink-icon-warning: #ff8c00;
  --blink-input-bg: #272727;
  --blink-input-stroke: #717171;
  --blink-input-stroke-selected: #3ea6ff;
  --blink-stroke-error: #ff4e45;
  --blink-stroke-primary: #3ea6ff;
  --blink-stroke-secondary: #272727;
  --blink-stroke-warning: #ff8c00;
  --blink-text-brand: #3ea6ff;
  --blink-text-button: #0f0f0f;
  --blink-text-error: #ff4e45;
  --blink-text-input: #fff;
  --blink-text-link: #3ea6ff;
  --blink-text-primary: #fff;
  --blink-text-secondary: #aaa;
  --blink-text-success: #2ba640;
  --blink-text-warning: #ff8c00;

  --blink-border-radius-rounded-lg: 8px;
  --blink-border-radius-rounded-xl: 12px;
  --blink-border-radius-rounded-2xl: 16px;
  --blink-border-radius-rounded-button: 18px;
  --blink-border-radius-rounded-input: 4px;

  --blink-shadow-container: 0 1px 2px rgba(0, 0, 0, 0.2);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 14px !important;
  line-height: 20px !important;
  font-family: "YouTube Sans", "Roboto", sans-serif !important;
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
  padding: 0 16px !important;
  height: 36px !important;
  min-width: 64px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
  transition: background-color 0.2s !important;
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
export function injectYoutubeStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = youtubeStyles;
  document.head.appendChild(styleElement);
}
