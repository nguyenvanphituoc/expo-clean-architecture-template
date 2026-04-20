import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

type AppShadowProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppShadow({ children, style }: AppShadowProps) {
  return (
    <View
      style={[
        {
          shadowColor: '#000000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.12,
          shadowRadius: 10,
          elevation: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
