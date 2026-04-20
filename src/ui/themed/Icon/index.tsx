import React from 'react';

import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';
import { IconComponent } from '@/ui/views/Icon';

import { IconSizeVariant, ThemedAppIconProps } from './type';

const SIZE_MAP: Record<IconSizeVariant, number> = {
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
};

export function AppIcon({ color, alpha, size = 'md', width, height, ...rest }: ThemedAppIconProps) {
  const theme = useTheme();
  const baseColor = color ? getColor(theme, color) : theme.colors.neutral.black;
  const resolvedColor = `${baseColor}${alpha ? theme.alpha[alpha] : ''}`;
  const resolvedSize = SIZE_MAP[size];

  return (
    <IconComponent
      fill={resolvedColor}
      stroke={resolvedColor}
      width={width ?? resolvedSize}
      height={height ?? resolvedSize}
      {...rest}
    />
  );
}
