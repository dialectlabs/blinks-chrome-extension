import { StylePreset } from '@dialectlabs/blinks';

// Function to get the appropriate StylePreset based on Reddit's dark mode
export const getRedditStylePreset = (isDarkMode: boolean): StylePreset => {
  return isDarkMode ? 'default' : 'custom';
};
