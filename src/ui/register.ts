export interface Register {}

type DefaultTheme = {
  colors: Record<string, Record<string | number, string>>;
  fonts: Record<string, { fontFamily: string; fontWeight: string }>;
  alpha: Record<string, string>;
  isDark: boolean;
};

export type RegisteredTheme = Register extends { theme: infer T } ? T : DefaultTheme;
