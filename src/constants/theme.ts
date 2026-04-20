import { makeTheme } from '@/theme';

export const Spacing = {
  zero: 0,
  one: 4,
  two: 8,
  three: 12,
  four: 16,
  five: 20,
  six: 24,
} as const;

const light = makeTheme(false);
const dark = makeTheme(true);

export const Colors = {
  light: {
    background: light.colors.neutral[25],
    backgroundElement: light.colors.neutral[100],
    text: light.colors.neutral[900],
  },
  dark: {
    background: dark.colors.neutral[25],
    backgroundElement: dark.colors.neutral[100],
    text: dark.colors.neutral[900],
  },
} as const;
