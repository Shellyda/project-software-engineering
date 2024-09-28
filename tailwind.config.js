/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-primary)']
      },
      colors: {
        primary: '#FCD74F',
        secondary: '#136640',
        base: '#F4F0E0',
        'secondary-base': '#3D2D1D',
        'black-primary': '#2E2C25',
        'base-beige': '#CBB9A7',
        'light-secondary-base': '#7B4D1F'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('tailwind-scrollbar')]
};
