import { Edge } from 'react-native-safe-area-context';

import { AlphaKey, ColorKey } from '@/theme/type';
import { ContainerProps } from '@/ui/views/View/type';

export type ContainerVariant = 'default' | 'row' | 'col' | 'centered' | 'card';

export type ThemedContainerProps = Omit<ContainerProps, 'color' | 'borderColor'> & {
  type?: ContainerVariant;
  color?: ColorKey;
  borderColor?: ColorKey;
  alpha?: AlphaKey;
  safe?: boolean | Edge[];
  insets?: Edge[];
};
