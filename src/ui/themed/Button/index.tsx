import React from 'react';

import { ColorKey } from '@/theme';
import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';
import { BaseButton } from '@/ui/views/Button';

import { AppIcon } from '../Icon';
import { AppText } from '../Text';
import { ThemedButtonProps } from './type';
import { useButtonTextVariants, useButtonVariants } from './variants';

function defaultTextColor(type: ThemedButtonProps['type']): ColorKey {
  switch (type) {
    case 'secondary':
      return 'neutral.700';
    case 'ghost':
    case 'outline':
      return 'aquaBlue.500';
    default:
      return 'neutral.white';
  }
}

export function AppButton({
  type = 'primary',
  size = 'md',
  state = 'default',
  bgColor,
  alpha,
  textColor,
  textFullWidth,
  iconLeft,
  iconRight,
  disabled,
  children,
  style,
  ...rest
}: ThemedButtonProps) {
  const theme = useTheme();
  const containerVariantStyles = useButtonVariants({ intent: type, size, state: disabled ? 'disabled' : state });
  const textVariantStyles = useButtonTextVariants({ intent: type, size });

  const effectiveTextColor = textColor ?? defaultTextColor(type);

  const dynamicStyle = {
    backgroundColor: bgColor ? `${getColor(theme, bgColor)}${alpha ? theme.alpha[alpha] : ''}` : undefined,
  };

  return (
    <BaseButton
      row
      justify="center"
      align="center"
      gap={8}
      disabled={disabled || state === 'disabled'}
      style={[...containerVariantStyles, dynamicStyle, style]}
      {...rest}
    >
      {iconLeft ? <AppIcon type={iconLeft} color={effectiveTextColor} size="sm" /> : null}
      <AppText style={[...textVariantStyles, textFullWidth ? { flex: 1 } : null]} color={effectiveTextColor}>
        {children}
      </AppText>
      {iconRight ? <AppIcon type={iconRight} color={effectiveTextColor} size="sm" /> : null}
    </BaseButton>
  );
}
