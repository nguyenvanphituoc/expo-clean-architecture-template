import { MAP_ICON_TYPE } from '@/constants/icons';

export type ICON_TYPE = keyof typeof MAP_ICON_TYPE;

export interface AppIconProps {
  type: ICON_TYPE;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  color?: string;
}
