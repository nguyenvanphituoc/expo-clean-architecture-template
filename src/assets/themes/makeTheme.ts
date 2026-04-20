import { ALPHA_VALUE } from './alpha';
import { COLOR_VALUE } from './color';
import { AppTheme } from './type';
import { FONT_VARIANTS } from './variant';

const DARK_COLOR_VALUE = {
  ...COLOR_VALUE,
  neutral: {
    ...COLOR_VALUE.neutral,
    25: '#10151D',
    50: '#131A23',
    100: '#1A2430',
    200: '#243244',
    300: '#2F3F56',
    400: '#51637A',
    500: '#738298',
    600: '#95A0B1',
    700: '#B4BDC8',
    800: '#D6DCE3',
    900: '#EEF1F5',
    white: '#0D1117',
    black: '#F8FAFD',
  },
} as const;

export function makeTheme(isDark = false): AppTheme {
  return {
    colors:  COLOR_VALUE,
    alpha: ALPHA_VALUE,
    fonts: FONT_VARIANTS,
  };
}
