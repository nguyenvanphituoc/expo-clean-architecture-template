import { AlphaKey, ColorKey } from '@/theme/type';
import { AppIconProps } from '@/ui/views/Icon/type';

export type IconSizeVariant = 'sm' | 'md' | 'lg' | 'xl';

export type ThemedAppIconProps = Omit<AppIconProps, 'fill' | 'stroke' | 'color' | 'width' | 'height'> & {
  color?: ColorKey;
  alpha?: AlphaKey;
  size?: IconSizeVariant;
  width?: number;
  height?: number;
};
