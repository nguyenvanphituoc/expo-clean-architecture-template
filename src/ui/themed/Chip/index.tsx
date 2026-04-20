import React from 'react';

import { ColorKey } from '@/theme/type';
import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';

import { AppIcon } from '../Icon';
import { AppPressable } from '../Pressable';
import { AppText } from '../Text';
import { AppContainer } from '../View';
import { AppChipProps, ChipIntent } from './type';
import { useChipLabelVariants, useChipVariants } from './variants';

const INTENT_ICON_COLOR: Record<ChipIntent, ColorKey> = {
  default: 'neutral.600',
  info: 'aquaBlue.600',
  success: 'success.600',
  warning: 'warning.600',
  error: 'error.600',
};

const INTENT_CLOSE_COLOR: Record<ChipIntent, ColorKey> = {
  default: 'neutral.500',
  info: 'aquaBlue.500',
  success: 'success.500',
  warning: 'warning.500',
  error: 'error.500',
};

export function AppChip({
  label,
  intent = 'default',
  size = 'md',
  iconLeft,
  dismissible,
  onDismiss,
  onPress,
  color,
  alpha,
  disabled,
}: AppChipProps) {
  const theme = useTheme();
  const chipStyles = useChipVariants({ intent, size });
  const labelStyles = useChipLabelVariants({ intent, size });

  const dynamicBg = color
    ? { backgroundColor: `${getColor(theme, color)}${alpha ? theme.alpha[alpha] : ''}` }
    : undefined;

  const content = (
    <AppContainer style={[...chipStyles, dynamicBg, disabled ? { opacity: 0.5 } : null]}>
      {iconLeft ? <AppIcon type={iconLeft} size="sm" color={INTENT_ICON_COLOR[intent]} /> : null}
      <AppText style={labelStyles}>{label}</AppText>
      {dismissible ? (
        <AppPressable onPress={onDismiss} disabled={disabled} hitSlop={8}>
          <AppIcon type="close" size="sm" color={INTENT_CLOSE_COLOR[intent]} />
        </AppPressable>
      ) : null}
    </AppContainer>
  );

  if (onPress) {
    return (
      <AppPressable onPress={onPress} disabled={disabled}>
        {content}
      </AppPressable>
    );
  }

  return content;
}
