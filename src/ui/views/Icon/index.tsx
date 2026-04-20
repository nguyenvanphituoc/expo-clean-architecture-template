import React from 'react';

import { MAP_ICON_TYPE } from '@/constants/icons';

import { AppIconProps } from './type';

export function IconComponent({ type, width = 16, height = 16, fill, stroke, color }: AppIconProps) {
  const SvgIcon = MAP_ICON_TYPE[type];
  if (!SvgIcon) return null;

  return <SvgIcon width={width} height={height} fill={fill} stroke={stroke} color={color} />;
}
