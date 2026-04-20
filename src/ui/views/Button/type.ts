import { ForwardedRef } from 'react';
import { View } from 'react-native';

import { AppPressableProps } from '../Pressable/type';
import { ContainerProps } from '../View/type';

export interface ButtonPrimitiveProps extends ContainerProps, AppPressableProps {
  disabled?: boolean;
}

export type PressableRef = ForwardedRef<View>;
