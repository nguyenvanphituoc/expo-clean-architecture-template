import React from 'react';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { createStyles } from '@/ui/hooks/createStyles';
import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';
import { View } from '@/ui/views/View';

import { ThemedContainerProps } from './type';

const useStyles = createStyles((theme) => ({
  default: {
    backgroundColor: theme.colors.neutral.transparent,
  },
  row: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  col: {
    flexDirection: 'column' as const,
  },
  centered: {
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    backgroundColor: theme.colors.neutral.white,
  },
}));

export function AppContainer({
  type = 'default',
  color,
  borderColor,
  alpha,
  safe,
  style,
  children,
  ...rest
}: ThemedContainerProps) {
  const styles = useStyles();
  const theme = useTheme();

  const variantStyle = styles[type] ?? styles.default;

  const dynamicStyle = {
    backgroundColor: color ? `${getColor(theme, color)}${alpha ? theme.alpha[alpha] : ''}` : undefined,
    borderColor: borderColor ? `${getColor(theme, borderColor)}${alpha ? theme.alpha[alpha] : ''}` : undefined,
  };

  const composedStyle = [variantStyle, dynamicStyle, style];

  if (safe) {
    const edges: Edge[] = Array.isArray(safe) ? safe : ['top', 'right', 'bottom', 'left'];

    return (
      <SafeAreaView edges={edges} style={{ flex: 1 }}>
        <View style={composedStyle} {...rest}>
          {children}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={composedStyle} {...rest}>
      {children}
    </View>
  );
}
