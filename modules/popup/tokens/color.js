import { components } from '@rosmarinus/common-tailwindcss';
import palette from './palette';

// 颜色文档:
// https://sn4a0lfrp3.feishu.cn/sheets/TV0JsOonEhEiybtlGAPcl7V2nie

const [lightMode, darkMode] = components.colors.colorPaletteToCssVarMapList({
  // ------------------ 按钮 ------------------
  'button-standard': [palette['neutral/100'], palette['neutral/1000']],
  'button-hover': [palette['neutral/400'], palette['neutral/600']],
  'button-click': [palette['neutral/600'], palette['neutral/400']],
  'button-border': [palette['neutral/300'], palette['neutral/800']],
  'button-standard-subscript': [palette['neutral/600'], palette['neutral/900']],
  'button-hover-subscript': [palette['neutral/700'], palette['neutral/400']],
  'button-click-subscript': [palette['neutral/900'], palette['neutral/300']],

  // ------------------ 开关 ------------------
  'switch-close-standard': [palette['neutral/400'], palette['neutral/400']],
  'switch-close-hover': [palette['neutral/600'], palette['neutral/600']],
  'switch-close-click': [palette['neutral/800'], palette['neutral/800']],
  'switch-open-standard': [palette['blue/600'], palette['blue/600']],
  'switch-open-hover': [palette['blue/800'], palette['blue/800']],
  'switch-open-click': [palette['blue/1000'], palette['blue/1000']],

  // ------------------ 背景 ------------------
  'bg-standard': [palette['neutral/50'], palette['neutral/1100']],
  'bg-inputbox-standard': [palette['neutral/100'], palette['neutral/1000']],
  'bg-inputbox-border': [palette['neutral/200'], palette['neutral/800']],
  'bg-switch-standard': [palette['neutral/200'], palette['neutral/900']],
  'bg-downbox-standard': [palette['neutral/200'], palette['neutral/1000']],
  'bg-downbox-hover': [palette['neutral/100'], palette['neutral/900']],
  'bg-downbox-click': [palette['neutral/400'], palette['neutral/800']],

  // ------------------ 品牌VI ------------------
  'brand-standard': [palette['blue/600'], palette['blue/600']],
  'brand-dark': [palette['blue/800'], palette['blue/800']],
  'brand-secondary': [palette['purple/600'], palette['purple/600']],

  // ------------------ 描边 ------------------
  'border-standard': [palette['neutral/200'], palette['neutral/900']],

  // ------------------ 图标 ------------------
  'icon-system': [palette['neutral/300'], palette['neutral/700']],
  'icon-system-click': [palette['neutral/600'], palette['neutral/400']],

  // ------------------ 文字 ------------------
  'font-standard': [palette['blue/1000'], palette['blue/100']],
  'font-hover': [palette['neutral/50'], palette['blue/100']],
  'font-light': [palette['neutral/500'], palette['neutral/800']],
  'font-light-02': [palette['neutral/300'], palette['neutral/900']],
  'font-light-hover': [palette['neutral/300'], palette['neutral/700']],
});

export { lightMode, darkMode };
