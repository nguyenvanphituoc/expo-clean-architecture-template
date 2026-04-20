import { AlphaKey, ColorKey, CustomTextVariant } from '@/theme';
import { AppTextProps } from '@/ui/views/Text/type';

export type TextVariant = 'default' | 'header' | 'title' | 'body' | 'error';

export type ThemedTextProps = Omit<AppTextProps, 'color'> & {
  type?: TextVariant;
  fontFamily?: CustomTextVariant;
  color?: ColorKey;
  alpha?: AlphaKey;
  mb?: number;
  mt?: number;
};
