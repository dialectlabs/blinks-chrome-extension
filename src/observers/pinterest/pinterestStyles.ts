import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Pinterest's theme
export const getPinterestStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles for Pinterest
const pinterestStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #e60023;
  --blink-button-disabled: #efefef;
  --blink-button-hover: #ad081b;
  --blink-button-success: #0076d3;
  --blink-icon-error: #cc0000;
  --blink-icon-primary: #767676;
  --blink-icon-warning: #ffa500;
  --blink-input-bg: #ffffff;
  --blink-input-stroke: #cdcdcd;
  --blink-input-stroke-selected: #e60023;
  --blink-stroke-error: #cc0000;
  --blink-stroke-primary: #e60023;
  --blink-stroke-secondary: #efefef;
  --blink-stroke-warning: #ffa500;
  --blink-text-brand: #e60023;
  --blink-text-button: #ffffff;
  --blink-text-error: #cc0000;
  --blink-text-input: #333333;
  --blink-text-link: #0076d3;
  --blink-text-primary: #333333;
  --blink-text-secondary: #767676;
  --blink-text-success: #0076d3;
  --blink-text-warning: #ffa500;

  --blink-border-radius-rounded-lg: 16px;
  --blink-border-radius-rounded-xl: 24px;
  --blink-border-radius-rounded-2xl: 32px;
  --blink-border-radius-rounded-button: 24px;
  --blink-border-radius-rounded-input: 16px;

  --blink-shadow-container: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
}

.blink.x-dark {
  --blink-bg-primary: #121212;
  --blink-button: #e60023;
  --blink-button-disabled: #2e2e2e;
  --blink-button-hover: #ad081b;
  --blink-button-success: #0076d3;
  --blink-icon-error: #ff5247;
  --blink-icon-primary: #efefef;
  --blink-icon-warning: #ffa500;
  --blink-input-bg: #2e2e2e;
  --blink-input-stroke: #4a4a4a;
  --blink-input-stroke-selected: #e60023;
  --blink-stroke-error: #ff5247;
  --blink-stroke-primary: #e60023;
  --blink-stroke-secondary: #2e2e2e;
  --blink-stroke-warning: #ffa500;
  --blink-text-brand: #e60023;
  --blink-text-button: #ffffff;
  --blink-text-error: #ff5247;
  --blink-text-input: #efefef;
  --blink-text-link: #4a9ae1;
  --blink-text-primary: #efefef;
  --blink-text-secondary: #9a9a9a;
  --blink-text-success: #4a9ae1;
  --blink-text-warning: #ffa500;

  --blink-border-radius-rounded-lg: 16px;
  --blink-border-radius-rounded-xl: 24px;
  --blink-border-radius-rounded-2xl: 32px;
  --blink-border-radius-rounded-button: 24px;
  --blink-border-radius-rounded-input: 16px;

  --blink-shadow-container: 0 1px 20px 0 rgba(0, 0, 0, 0.2);
}

/* Additional styles to ensure consistent rendering in Pinterest */
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
  padding: 12px 16px !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  text-transform: none !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: none !important;
}
`;

// Function to inject styles into the page
export function injectPinterestStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = pinterestStyles;
  document.head.appendChild(styleElement);
}
