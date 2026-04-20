import { ReactNode } from 'react';

import { AlphaKey, ColorKey } from '@/theme/type';
import { ButtonPrimitiveProps } from '@/ui/views/Button/type';
import { ICON_TYPE } from '@/ui/views/Icon/type';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'outline';
export type ButtonSizeVariant = 'sm' | 'md' | 'lg';
export type ButtonState = 'default' | 'disabled' | 'loading';

export type ThemedButtonProps = Omit<ButtonPrimitiveProps, 'children'> & {
  type?: ButtonVariant;
  size?: ButtonSizeVariant;
  state?: ButtonState;
  bgColor?: ColorKey;
  alpha?: AlphaKey;
  textColor?: ColorKey;
  textFullWidth?: boolean;
  iconLeft?: ICON_TYPE;
  iconRight?: ICON_TYPE;
  children?: ReactNode;
};
