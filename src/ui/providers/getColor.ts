import { AppTheme, ColorKey } from '@/theme/type';

export function getColor(theme: AppTheme, key?: ColorKey): string {
  if (!key) return '';

  const parts = key.split('.');
  let current: unknown = theme.colors;

  for (const part of parts) {
    if (typeof current !== 'object' || current === null || !(part in (current as Record<string, unknown>))) {
      return '';
    }
    current = (current as Record<string, unknown>)[part];
  }

  return typeof current === 'string' ? current : '';
}
