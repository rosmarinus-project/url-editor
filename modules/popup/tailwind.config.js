/* eslint-disable max-lines-per-function */
import plugin from 'tailwindcss/plugin';
import { presets, utils, components } from '@rosmarinus/common-tailwindcss';
import { darkMode, lightMode, spacing, font } from './tokens';

/** @type {import('tailwindcss').Config} */
const config = {
  presets: [presets],
  content: ['./src/**/*.{html,js,ts,tsx,jsx,vue}'],
  theme: {
    colors: utils.arrToCssVarObj(Object.keys(lightMode)),
    spacing: {
      ...utils.arrToCssVarObj(Object.keys(spacing)),
    },
    fontSize: {
      ...utils.arrToCssVarObj(Object.keys(font)),
    },
    borderWidth: {
      ...utils.arrToCssVarObj(Object.keys(spacing)),
    },
    borderRadius: {
      ...utils.arrToCssVarObj(Object.keys(spacing)),
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        // hover / 点击态。适用于有背景色的情况
        '.c-active-brand-01': {
          ...components.text.noSelect,
          '&:hover': {
            background: 'var(--brand-standard)',
            '--font-standard': 'var(--font-hover)',
            '--font-light': 'var(--font-light-hover)',
          },
          '&:active': {
            background: 'var(--brand-dark)',
            '--font-standard': 'var(--font-hover)',
            '--font-light': 'var(--font-light-hover)',
          },
        },
        // hover / 点击态。适用于 icon 的情况
        '.c-active-brand-02': {
          ...components.text.noSelect,
          '&:hover': {
            '--icon-system': 'var(--brand-standard)',
          },
          '&:active': {
            '--icon-system': 'var(--brand-dark)',
          },
        },
        '.c-active-brand-03': {
          ...components.text.noSelect,
          '&:hover': {
            '--font-light': 'var(--brand-standard)',
          },
          '&:active': {
            '--font-light': 'var(--brand-dark)',
          },
        },
        '.c-active-press': {
          ...components.text.noSelect,
          '&:active': {
            background: 'var(--bg-downbox-click)',
          },
        },
        // 删除按钮，下划线的情况
        '.c-active-brand-05': {
          ...components.text.noSelect,
          '&:hover': {
            color: 'var(--brand-standard)',
            'text-decoration-line': 'underline',
          },
          '&:active': {
            color: 'var(--brand-dark)',
            'text-decoration-line': 'underline',
          },
        },
        // 设置按钮的旋转彩蛋
        '.c-active-rotate': {
          ...components.text.noSelect,
          transition: 'transform 0.2s',
          transform: 'rotate(0deg)',
          '&:hover': {
            transform: 'rotate(360deg)',
          },
        },
        // 角标的 hover / 点击态
        '.c-active-subscript': {
          '&:hover': {
            background: 'var(--button-hover-subscript)',
          },
          '&:active': {
            background: 'var(--button-click-subscript)',
          },
        },
        '.c-transform-out-right-top': {
          transform: 'translate(50%, -50%)',
        },
        '.c-transform-out-left': {
          transform: 'translate(-100%, 0)',
        },
        '.c-active-button': {
          ...components.text.noSelect,
          '&:hover': {
            '--icon-system': 'var(--icon-system-click)',
            background: 'var(--button-hover)',
          },
          '&:active': {
            background: 'var(--button-click)',
          },
        },
        '.c-token-lm': lightMode,
        '.c-token-dm': darkMode,
        '.c-token-spacing': spacing,
        '.c-token-font': font,
      });
    }),
  ],
};

export default config;
