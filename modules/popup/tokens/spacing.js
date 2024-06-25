import { components } from '@rosmarinus/common-tailwindcss';
import palette, { spacingPalette } from './palette';

export const spacing = components.spacing.spacingPaletteToCssVarMap({
  ...spacingPalette,

  // ------------------ rounded ------------------
  'rounded-icon': palette['original/2'],
  'rounded-button': palette['original/6'],
  'rounded-inputbox': palette['original/14'],

  // ------------------ spacing ------------------
  'spacing-level-icontext': palette['original/2'],
  'spacing-vertical': palette['original/6'],
  'spacing-level': palette['original/6'],
  'spacing-vertical-list': palette['original/34'],
  'spacing-level-list': palette['original/34'],

  // ------------------ stroke ------------------
  'stroke-standard': palette['original/2'],
});
