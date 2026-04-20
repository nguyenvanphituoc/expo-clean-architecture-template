import { AlphaKey, ColorKey } from '@/theme/type';
import { ICON_TYPE } from '@/ui/views/Icon/type';

export type ChipIntent = 'default' | 'info' | 'success' | 'warning' | 'error';
export type ChipSize = 'sm' | 'md';

export interface AppChipProps {
  label: string;
  intent?: ChipIntent;
  size?: ChipSize;
  iconLeft?: ICON_TYPE;
  dismissible?: boolean;
  onDismiss?: () => void;
  onPress?: () => void;
  color?: ColorKey;
  alpha?: AlphaKey;
  disabled?: boolean;
}
