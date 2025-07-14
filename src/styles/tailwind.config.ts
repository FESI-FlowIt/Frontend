import type { Config } from 'tailwindcss';
import pxToRem from 'tailwindcss-preset-px-to-rem';

const config: Config = {
  presets: [pxToRem()],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
};

export default config;
