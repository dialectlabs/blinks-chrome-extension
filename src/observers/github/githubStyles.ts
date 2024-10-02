import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on GitHub's dark mode
export const getGithubStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'x-dark' : 'x-light';
};

// Add these custom styles to your CSS
const githubStyles = `
.blink.x-light {
  --blink-bg-primary: #ffffff;
  --blink-button: #2ea44f;
  --blink-button-disabled: #94d3a2;
  --blink-button-hover: #2c974b;
  --blink-button-success: #2ea44f;
  --blink-icon-error: #cb2431;
  --blink-icon-primary: #6a737d;
  --blink-icon-warning: #f66a0a;
  --blink-input-bg: #ffffff;
  --blink-input-stroke: #e1e4e8;
  --blink-input-stroke-selected: #0366d6;
  --blink-stroke-error: #cb2431;
  --blink-stroke-primary: #2ea44f;
  --blink-stroke-secondary: #e1e4e8;
  --blink-stroke-warning: #f66a0a;
  --blink-text-brand: #0366d6;
  --blink-text-button: #ffffff;
  --blink-text-error: #cb2431;
  --blink-text-input: #24292e;
  --blink-text-link: #0366d6;
  --blink-text-primary: #24292e;
  --blink-text-secondary: #586069;
  --blink-text-success: #ffffff;
  --blink-text-warning: #f66a0a;

  --blink-border-radius-rounded-lg: 0.375rem;
  --blink-border-radius-rounded-xl: 0.5rem;
  --blink-border-radius-rounded-2xl: 0.75rem;
  --blink-border-radius-rounded-button: 0.375rem;
  --blink-border-radius-rounded-input: 0.375rem;

  --blink-shadow-container: 0 1px 0 rgba(27,31,35,0.04);
}

.blink.x-dark {
  --blink-bg-primary: #0d1117;
  --blink-button: #238636;
  --blink-button-disabled: #94d3a2;
  --blink-button-hover: #2ea043;
  --blink-button-success: #238636;
  --blink-icon-error: #f85149;
  --blink-icon-primary: #8b949e;
  --blink-icon-warning: #d29922;
  --blink-input-bg: #0d1117;
  --blink-input-stroke: #30363d;
  --blink-input-stroke-selected: #58a6ff;
  --blink-stroke-error: #f85149;
  --blink-stroke-primary: #238636;
  --blink-stroke-secondary: #30363d;
  --blink-stroke-warning: #d29922;
  --blink-text-brand: #58a6ff;
  --blink-text-button: #ffffff;
  --blink-text-error: #f85149;
  --blink-text-input: #c9d1d9;
  --blink-text-link: #58a6ff;
  --blink-text-primary: #c9d1d9;
  --blink-text-secondary: #8b949e;
  --blink-text-success: #ffffff;
  --blink-text-warning: #d29922;

  --blink-border-radius-rounded-lg: 0.375rem;
  --blink-border-radius-rounded-xl: 0.5rem;
  --blink-border-radius-rounded-2xl: 0.75rem;
  --blink-border-radius-rounded-button: 0.375rem;
  --blink-border-radius-rounded-input: 0.375rem;

  --blink-shadow-container: 0 1px 0 rgba(27,31,35,0.04);
}

/* Additional styles to ensure consistent rendering */
.dialect-action-root-container {
  max-width: 500px !important;
  margin: 10px 0 !important;
  font-size: 0.875rem !important;
  line-height: 1.5 !important;
}

.blink {
  width: 100% !important;
  box-sizing: border-box !important;
}

.blink-container {
  padding: 1rem !important;
  border-radius: var(--blink-border-radius-rounded-lg) !important;
  background-color: var(--blink-bg-primary) !important;
  border: 1px solid var(--blink-stroke-secondary) !important;
  box-shadow: var(--blink-shadow-container) !important;
}

.blink-header, .blink-body, .blink-footer {
  margin-bottom: 8px !important;
}

.blink-button {
  padding: 0.5rem 1rem !important;
  border-radius: var(--blink-border-radius-rounded-button) !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  background-color: var(--blink-button) !important;
  color: var(--blink-text-button) !important;
  border: 1px solid rgba(27,31,35,0.15) !important;
}
`;

export function injectGithubStyles() {
  const styleElement = document.createElement('style');
  styleElement.textContent = githubStyles;
  document.head.appendChild(styleElement);
}
