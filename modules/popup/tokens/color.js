import { components } from '@rosmarinus/common-tailwindcss';

const [lightMode, darkMode] = components.colors.colorPaletteToCssVarMapList({
  'active-fg-3': ['rgba(0, 0, 0, 0.05)', 'rgba(255, 255, 255, 0.05)'],
  'active-fg-2': ['rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.05)'],

  'fg-0': ['rgba(0, 0, 0, 0.9)', 'rgba(255, 255, 255, 0.8)'],
  'fg-1': ['rgba(0, 0, 0, 0.5)', 'rgba(255, 255, 255, 0.5)'],
  'fg-2': ['rgba(0, 0, 0, 0.3)', 'rgba(255, 255, 255, 0.3)'],
  'fg-3': ['rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.05)'],
  'bg-0': ['#ededed', '#111111'],
  'bg-1': ['#f7f7f7', '#1e1e1e'],
  'bg-2': ['#ffffff', '#191919'],
  'alpha-3': ['rgba(0, 0, 0, 0.03)', 'rgba(255, 255, 255, 0.03)'],
});

export { lightMode, darkMode };
