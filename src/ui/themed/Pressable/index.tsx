import React from 'react';

import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';
import { PressableComponent } from '@/ui/views/Pressable';

import { ThemedPressableProps } from './type';

export function AppPressable({ color, alpha, style, ...rest }: ThemedPressableProps) {
  const theme = useTheme();

  const dynamicStyle = {
    backgroundColor: color ? `${getColor(theme, color)}${alpha ? theme.alpha[alpha] : ''}` : undefined,
  };

  return <PressableComponent style={[dynamicStyle, style]} {...rest} />;
}
