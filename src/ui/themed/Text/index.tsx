import React from 'react';

import { createStyles } from '@/ui/hooks/createStyles';
import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';
import { AppTextComponent } from '@/ui/views/Text';

import { ThemedTextProps } from './type';

const useStyles = createStyles((theme) => ({
  default: { ...theme.fonts.regular, fontSize: 14, lineHeight: 20, color: theme.colors.neutral[900] },
  header: { ...theme.fonts.bold, fontSize: 20, lineHeight: 26, color: theme.colors.neutral[900] },
  title: { ...theme.fonts.semiBold, fontSize: 18, lineHeight: 24, color: theme.colors.neutral[900] },
  body: { ...theme.fonts.regular, fontSize: 14, lineHeight: 20, color: theme.colors.neutral[700] },
  error: { ...theme.fonts.regular, fontSize: 14, lineHeight: 20, color: theme.colors.error[500] },
}));

export function AppText({
  type = 'default',
  fontFamily,
  color,
  alpha,
  fontSize,
  lineHeight,
  mt,
  mb,
  style,
  ...rest
}: ThemedTextProps) {
  const styles = useStyles();
  const theme = useTheme();

  const baseStyle = fontFamily ? theme.fonts[fontFamily] : styles[type];

  const dynamicStyle = {
    color: color ? `${getColor(theme, color)}${alpha ? theme.alpha[alpha] : ''}` : undefined,
    fontSize,
    lineHeight,
    marginTop: mt,
    marginBottom: mb,
  };

  return <AppTextComponent style={[baseStyle, dynamicStyle, style]} {...rest} />;
}
