import { AppTheme } from '@/theme/type';

type EmptyStyleMap = Record<string, never>;

export function createGlobalStyles(theme: AppTheme) {
  return {
    theme,
    molecules: {} as EmptyStyleMap,
    organisms: {} as EmptyStyleMap,
  };
}
