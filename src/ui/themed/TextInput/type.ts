import { AlphaKey, ColorKey } from '@/theme/type';
import { AppTextInputProps } from '@/ui/views/TextInput/type';

export type InputVariant = 'default' | 'outlined' | 'underlined' | 'error' | 'success' | 'disabled';

export type ThemedTextInputProps = Omit<AppTextInputProps, 'placeholderTextColor'> & {
  variant?: InputVariant;
  containerColor?: ColorKey;
  alpha?: AlphaKey;
  placeholderTextColor?: ColorKey;
};
