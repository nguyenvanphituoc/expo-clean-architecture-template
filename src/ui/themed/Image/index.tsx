import { Image as ExpoImage } from 'expo-image';
import React from 'react';

import { View } from '@/ui/views/View';

import { AppImageProps } from './type';

export function AppImage({
  width,
  height,
  square,
  round,
  radius,
  overflow = 'hidden',
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  imageStyle,
  ...rest
}: AppImageProps) {
  return (
    <View
      width={width}
      height={height}
      square={square}
      round={round}
      radius={radius}
      overflow={overflow}
      m={m}
      mx={mx}
      my={my}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
    >
      <ExpoImage style={[{ width: '100%', height: '100%' }, imageStyle]} {...rest} />
    </View>
  );
}
