import { TextInputProps } from 'react-native';

export interface AppTextInputProps extends TextInputProps {
  onFocusChange?: (focused: boolean) => void;
}
