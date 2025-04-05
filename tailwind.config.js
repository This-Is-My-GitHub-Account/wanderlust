/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e40af', // blue-800
        },
        secondary: {
          DEFAULT: '#ffffff',
        },
        navbar: {
          DEFAULT: '#1e3a8a', // blue-900
        }
      }
    },
  },
  plugins: [],
};