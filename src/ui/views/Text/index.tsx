import React from 'react';
import { I18nManager, Text } from 'react-native';

import { AppTextProps } from './type';

export function AppTextComponent({
  style,
  fontSize,
  lineHeight,
  align,
  decorationLine,
  letterSpacing,
  color,
  allowFontScaling = false,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        {
          fontSize,
          lineHeight,
          textAlign: align ?? (I18nManager.isRTL ? 'right' : 'left'),
          textDecorationLine: decorationLine,
          letterSpacing,
          color,
        },
        style,
      ]}
      allowFontScaling={allowFontScaling}
      {...props}
    />
  );
}
