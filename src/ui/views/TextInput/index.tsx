import React, { useState } from 'react';
import { TextInput } from 'react-native';

import { AppTextInputProps } from './type';

export function BaseTextInputComponent({ onFocus, onBlur, onFocusChange, style, ...props }: AppTextInputProps) {
  const [_isFocused, setFocused] = useState(false);

  return (
    <TextInput
      style={style}
      onFocus={(e) => {
        setFocused(true);
        onFocusChange?.(true);
        onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        onFocusChange?.(false);
        onBlur?.(e);
      }}
      {...props}
    />
  );
}
