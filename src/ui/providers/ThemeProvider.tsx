import React, { ReactNode, createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';

import { AppTheme, makeTheme } from '@/theme';

const ThemeContext = createContext<AppTheme>(makeTheme(false));

type ThemeProviderProps = {
  children: ReactNode;
  forceDark?: boolean;
};

export function ThemeProvider({ children, forceDark }: ThemeProviderProps) {
  const scheme = useColorScheme();
  const isDark = forceDark ?? scheme === 'dark';
  const theme = useMemo(() => makeTheme(isDark), [isDark]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): AppTheme {
  return useContext(ThemeContext);
}
