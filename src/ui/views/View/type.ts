import { ViewProps, ViewStyle } from 'react-native';

export interface ContainerProps extends ViewProps {
  flex?: ViewStyle['flex'];
  flexShrink?: ViewStyle['flexShrink'];
  flexWrap?: ViewStyle['flexWrap'];
  row?: boolean;
  col?: boolean;
  absolute?: boolean;
  position?: ViewStyle['position'];

  justify?: ViewStyle['justifyContent'];
  align?: ViewStyle['alignItems'];
  self?: ViewStyle['alignSelf'];

  width?: ViewStyle['width'];
  height?: ViewStyle['height'];
  maxWidth?: ViewStyle['maxWidth'];
  minWidth?: ViewStyle['minWidth'];
  maxHeight?: ViewStyle['maxHeight'];
  minHeight?: ViewStyle['minHeight'];
  square?: number;
  round?: number;

  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  gap?: number;

  color?: string;
  radius?: ViewStyle['borderRadius'];
  radiusTop?: number;
  radiusBottom?: number;
  border?: number;
  borderColor?: string;
  overflow?: ViewStyle['overflow'];
  opacity?: ViewStyle['opacity'];

  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
