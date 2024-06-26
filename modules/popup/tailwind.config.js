/* eslint-disable max-lines-per-function */
import plugin from 'tailwindcss/plugin';
import { presets, utils, components } from '@rosmarinus/common-tailwindcss';
import { darkMode, lightMode, font } from './tokens';

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [presets],
  content: ['./src/**/*.{html,js,ts,tsx,jsx,vue}'],
  theme: {
    colors: utils.arrToCssVarObj(Object.keys(lightMode)),
    fontSize: utils.arrToCssVarObj(Object.keys(font)),
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.c-active-mask': {
          position: 'relative',
          ...components.text.noSelect,
          '&:hover': {
            '&::after': {
              content: '" "',
              display: 'block',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'var(--active-fg-3)',
            },
          },
          '&:active': {
            '&::after': {
              content: '" "',
              display: 'block',
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
              background: 'var(--active-fg-2)',
            },
          },
        },
        '.c-active-cover': {
          position: 'relative',
          ...components.text.noSelect,
          '&:hover': {
            '&::after': {
              content: '" "',
              display: 'block',
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              bottom: '-4px',
              right: '-4px',
              background: 'var(--active-fg-3)',
              borderRadius: '4px',
            },
          },
          '&:active': {
            '&::after': {
              content: '" "',
              display: 'block',
              position: 'absolute',
              top: '-4px',
              left: '-4px',
              bottom: '-4px',
              right: '-4px',
              background: 'var(--active-fg-2)',
              borderRadius: '4px',
            },
          },
        },
        '.c-token-lm': lightMode,
        '.c-token-dm': darkMode,
        '.c-token-font': font,
      });
    }),
  ],
};

export default config;
