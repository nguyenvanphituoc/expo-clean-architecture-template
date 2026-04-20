import React, { forwardRef } from 'react';
import { View } from 'react-native';

import { PressableComponent } from '../Pressable';

import { ButtonPrimitiveProps } from './type';

export const BaseButton = forwardRef<View, ButtonPrimitiveProps>(function BaseButton(
  {
    children,
    onPress,
    disabled,
    activeOpacity,
    throttleDelay,
    style,
    ...containerProps
  },
  ref,
) {
  return (
    <PressableComponent
      ref={ref}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      throttleDelay={throttleDelay}
    >
      <View style={style} {...containerProps}>
        {children}
      </View>
    </PressableComponent>
  );
});
