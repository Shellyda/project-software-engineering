import colors from './src/styles/colors';

/** @type {import('tailwindcss').Config} */
export const mode = 'jit';
export const content = ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    fontFamily: {
      primary: ['var(--font-primary)']
    },
    colors
  }
};
export const variants = {
  extend: {}
};
export const plugins = [require('tailwind-scrollbar')];
