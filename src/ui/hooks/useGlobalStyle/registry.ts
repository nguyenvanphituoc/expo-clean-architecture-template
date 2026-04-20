import { AppTheme } from '@/theme/type';

import { createGlobalStyles } from './create';

type GlobalStyles = ReturnType<typeof createGlobalStyles>;

const cache = new WeakMap<AppTheme, GlobalStyles>();

export function getCachedGlobalStyles(theme: AppTheme): GlobalStyles {
  const cached = cache.get(theme);
  if (cached) return cached;

  const styles = createGlobalStyles(theme);
  cache.set(theme, styles);
  return styles;
}
