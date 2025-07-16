// tailwind.config.js

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        wave: 'wave 0.8s infinite ease-in-out',
      },
      keyframes: {
        wave: {
          '0%, 100%': { height: '0.25rem' },
          '50%': { height: '1.5rem' },
        },
      },
    },
  },
  plugins: [],
};
