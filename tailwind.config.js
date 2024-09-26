/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  safelist: process.env.NODE_ENV === 'development' ? [{ pattern: /./ }] : [],
  theme: {
    extend: {
      colors: {
        accent: {
          brand: '#1F69FF',
          success: '#09CBBF',
          error: '#F62D2D',
          warning: '#FF9900',
        },
        twitter: {
          neutral: {
            100: '#0f1419',
            80: '#202327',
            70: '#2f3336',
            50: '#6E767D',
            40: '#C4C4C4',
            30: '#d9d9d9',
            20: '#eff3f4',
          },
          accent: '#1d9bf0',
          success: '#00c466',
          error: '#ff6f6f',
        },
        backgroundColor: {
          'primary-10': 'rgba(255, 255, 255, 0.1)', // Assuming primary is white
        },
      },
      textColor: {
        primary: '#FFFFFF',
        secondary: '#434445',
        tertiary: '#737373',
        quaternary: '#888989',
        inverse: '#000000',
        icon: {
          primary: '#FFFFFF',
          secondary: '#888989',
          tertiary: '#B3B3B3',
          inverse: '#000000',
        },
      },
      borderColor: {
        primary: '#DEE1E7',
        secondary: '#EBEBEB',
      },
      fontSize: {
        highlight: ['1.5rem', '2rem'],
        text: ['0.938rem', '1.125rem'],
        subtext: ['0.813rem', '1rem'],
        caption: ['0.688rem', '0.875rem'],
      },
      boxShadow: {
        action:
          '0px 2px 8px 0px rgba(59, 176, 255, 0.22), 0px 1px 48px 0px rgba(29, 155, 240, 0.32)',
      },
    },
  },
  plugins: [],
};
