import { SwitchProps } from 'react-native';

import { ColorKey } from '@/theme/type';

export type SwitchComponentProps = Omit<SwitchProps, 'trackColor' | 'thumbColor'> & {
  label?: string;
  description?: string;
  trackColorOn?: ColorKey;
  trackColorOff?: ColorKey;
  thumbColorOn?: ColorKey;
  thumbColorOff?: ColorKey;
};
