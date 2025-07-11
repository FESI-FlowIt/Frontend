import type { Config } from 'tailwindcss';

import { colors } from './theme/colors';
import { fontFamily } from './theme/fontFamily';
import { fontSize } from './theme/fontSize';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors,
      fontFamily,
      fontSize,
    },
  },
};

export default config;
