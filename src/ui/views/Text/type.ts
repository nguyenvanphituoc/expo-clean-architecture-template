import { TextProps, TextStyle } from 'react-native';

export interface AppTextProps extends TextProps {
  fontSize?: TextStyle['fontSize'];
  lineHeight?: TextStyle['lineHeight'];
  align?: TextStyle['textAlign'];
  decorationLine?: TextStyle['textDecorationLine'];
  letterSpacing?: TextStyle['letterSpacing'];
  color?: string;
}
