import { ALPHA_VALUE } from './alpha';
import { COLOR_VALUE } from './color';
import { FONT_VARIANTS } from './variant';

export type ThemeColors = typeof COLOR_VALUE;
export type ThemeAlpha = typeof ALPHA_VALUE;
export type ThemeFonts = typeof FONT_VARIANTS;

type KeyToString<K> = K extends string | number ? `${K}` : never;

type FlattenColors<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends string
    ? `${Prefix}${KeyToString<K>}`
    : FlattenColors<T[K], `${Prefix}${KeyToString<K>}.`>;
}[keyof T];

export type ColorKey = FlattenColors<ThemeColors>;
export type AlphaKey = keyof ThemeAlpha & string;
export type FontKey = keyof ThemeFonts & string;

export type AppTheme = {
  colors: ThemeColors;
  alpha: ThemeAlpha;
  fonts: ThemeFonts;
  // isDark: boolean;
};
