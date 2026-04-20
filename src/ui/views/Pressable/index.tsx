import React, { forwardRef, useRef } from 'react';
import { Pressable, View } from 'react-native';

import { AppPressableProps } from './type';

export const PressableComponent = forwardRef<View, AppPressableProps>(function PressableComponent(
  { children, onPress, activeOpacity = 0.7, throttleDelay = 250, style, disabled, ...props },
  ref,
) {
  const lastPressRef = useRef(0);

  return (
    <Pressable
      ref={ref}
      disabled={disabled}
      onPress={(event) => {
        const now = Date.now();
        if (throttleDelay > 0 && now - lastPressRef.current < throttleDelay) {
          return;
        }
        lastPressRef.current = now;
        onPress?.(event);
      }}
      style={({ pressed }) => [style, pressed && !disabled ? { opacity: activeOpacity } : null]}
      {...props}
    >
      {children}
    </Pressable>
  );
});
