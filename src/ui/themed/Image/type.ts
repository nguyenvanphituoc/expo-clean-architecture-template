import { ImageProps } from 'expo-image';

import { ContainerProps } from '@/ui/views/View/type';

type LayoutProps = Pick<
  ContainerProps,
  | 'width'
  | 'height'
  | 'square'
  | 'round'
  | 'radius'
  | 'overflow'
  | 'm'
  | 'mx'
  | 'my'
  | 'mt'
  | 'mb'
  | 'ml'
  | 'mr'
>;

export type AppImageProps = Omit<ImageProps, 'style'> &
  LayoutProps & {
    imageStyle?: ImageProps['style'];
  };
