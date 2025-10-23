/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a84ff',
        brand: {
          DEFAULT: '#0a84ff',
          dark: '#066bd6'
        }
      }
    },
  },
  plugins: [],
};
