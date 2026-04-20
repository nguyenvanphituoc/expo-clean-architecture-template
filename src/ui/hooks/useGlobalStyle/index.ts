import { useTheme } from '@/ui/providers/ThemeProvider';

import { createGlobalStyles } from './create';
import { getCachedGlobalStyles } from './registry';

export { createGlobalStyles };

export function useGlobalStyles() {
  const theme = useTheme();
  return getCachedGlobalStyles(theme);
}
