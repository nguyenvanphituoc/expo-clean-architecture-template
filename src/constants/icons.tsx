import { SymbolView } from 'expo-symbols';
import React from 'react';

type IconRenderProps = {
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
  color?: string;
};

function symbolIcon(name: string) {
  return function SymbolIcon({ width = 16, height = 16, fill, stroke, color }: IconRenderProps) {
    return (
      <SymbolView
        name={{ ios: name as any, android: name.replace('.', '_') as any, web: name.replace('.', '_') as any }}
        size={Math.max(width, height)}
        tintColor={stroke ?? fill ?? color ?? '#0F1217'}
      />
    );
  };
}

export const MAP_ICON_TYPE = {
  chevronRight: symbolIcon('chevron.right'),
  chevronLeft: symbolIcon('chevron.left'),
  close: symbolIcon('xmark'),
  heart: symbolIcon('heart.fill'),
  tag: symbolIcon('tag.fill'),
  home: symbolIcon('house.fill'),
  explore: symbolIcon('safari.fill'),
} as const;
