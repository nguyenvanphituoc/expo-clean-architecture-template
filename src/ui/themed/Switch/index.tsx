import React from 'react';
import { Switch } from 'react-native';

import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';

import { AppText } from '../Text';
import { AppContainer } from '../View';
import { SwitchComponentProps } from './type';

export function SwitchComponent({
  label,
  description,
  value,
  trackColorOn = 'aquaBlue.500',
  trackColorOff = 'neutral.300',
  thumbColorOn = 'neutral.white',
  thumbColorOff = 'neutral.white',
  ...rest
}: SwitchComponentProps) {
  const theme = useTheme();

  return (
    <AppContainer row align="center" justify="space-between" gap={12}>
      <AppContainer flex={1}>
        {label ? <AppText type="body">{label}</AppText> : null}
        {description ? <AppText type="default" color="neutral.500">{description}</AppText> : null}
      </AppContainer>

      <Switch
        value={value}
        trackColor={{
          false: getColor(theme, trackColorOff),
          true: getColor(theme, trackColorOn),
        }}
        thumbColor={value ? getColor(theme, thumbColorOn) : getColor(theme, thumbColorOff)}
        {...rest}
      />
    </AppContainer>
  );
}
