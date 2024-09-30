import customTheme from './src/styles/customTheme';

/** @type {import('tailwindcss').Config} */
export const mode = 'jit';
export const content = ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'];
export const theme = {
  extend: {
    ...customTheme
  }
};
export const variants = {
  extend: {}
};
export const plugins = [require('tailwind-scrollbar')];
