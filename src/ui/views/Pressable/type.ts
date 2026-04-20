import { ReactNode } from 'react';
import { PressableProps, StyleProp, ViewStyle } from 'react-native';

export interface AppPressableProps extends Omit<PressableProps, 'style' | 'children'> {
  children?: ReactNode;
  activeOpacity?: number;
  throttleDelay?: number;
  style?: StyleProp<ViewStyle>;
}
