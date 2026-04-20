import React, { useState } from 'react';

import { createStyles } from '@/ui/hooks/createStyles';
import { getColor } from '@/ui/providers/getColor';
import { useTheme } from '@/ui/providers/ThemeProvider';
import { BaseTextInputComponent } from '@/ui/views/TextInput';

import { AppContainer } from '../View';
import { ThemedTextInputProps } from './type';

const useStyles = createStyles((theme) => ({
  default: {
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  outlined: {
    borderWidth: 1,
    borderColor: theme.colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  outlinedFocus: {
    borderColor: theme.colors.aquaBlue[500],
  },
  underlined: {
    borderBottomWidth: 1,
    borderColor: theme.colors.neutral[200],
    paddingHorizontal: 4,
  },
  error: {
    borderWidth: 1,
    borderColor: theme.colors.error[500],
    backgroundColor: theme.colors.error[25],
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  success: {
    borderWidth: 1,
    borderColor: theme.colors.success[500],
    backgroundColor: theme.colors.success[100],
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  disabled: {
    backgroundColor: theme.colors.neutral[200],
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputText: {
    ...theme.fonts.regular,
    fontSize: 14,
    color: theme.colors.neutral[900],
    paddingVertical: 10,
    minHeight: 44,
  },
}));

export function AppTextInput({
  variant = 'outlined',
  containerColor,
  alpha,
  placeholderTextColor,
  style,
  editable,
  ...rest
}: ThemedTextInputProps) {
  const [isFocused, setFocused] = useState(false);
  const styles = useStyles();
  const theme = useTheme();

  const effectiveVariant = editable === false ? 'disabled' : variant;

  const containerStyle = [
    styles[effectiveVariant] ?? styles.default,
    isFocused && effectiveVariant === 'outlined' ? styles.outlinedFocus : null,
    containerColor
      ? { backgroundColor: `${getColor(theme, containerColor)}${alpha ? theme.alpha[alpha] : ''}` }
      : null,
  ];

  return (
    <AppContainer style={containerStyle}>
      <BaseTextInputComponent
        style={[styles.inputText, style]}
        placeholderTextColor={
          placeholderTextColor ? getColor(theme, placeholderTextColor) : theme.colors.neutral[400]
        }
        onFocusChange={setFocused}
        editable={editable}
        {...rest}
      />
    </AppContainer>
  );
}
