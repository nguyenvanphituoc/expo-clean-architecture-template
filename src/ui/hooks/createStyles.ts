import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { AppTheme } from '@/theme/type';
import { useTheme } from '@/ui/providers/ThemeProvider';

export function createStyles<T extends StyleSheet.NamedStyles<T>>(
  factory: (theme: AppTheme) => T,
): () => T {
  return function useStyles(): T {
    const theme = useTheme();
    return useMemo(() => StyleSheet.create(factory(theme)), [factory, theme]);
  };
}
