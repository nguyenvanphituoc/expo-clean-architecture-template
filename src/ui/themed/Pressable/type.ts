import { AlphaKey, ColorKey } from '@/theme/type';
import { AppPressableProps } from '@/ui/views/Pressable/type';

export type ThemedPressableProps = Omit<AppPressableProps, 'style'> & {
  color?: ColorKey;
  alpha?: AlphaKey;
  style?: AppPressableProps['style'];
};
