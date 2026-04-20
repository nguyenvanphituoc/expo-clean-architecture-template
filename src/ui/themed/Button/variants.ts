import { TextStyle, ViewStyle } from 'react-native';

import { createVariants } from '@/ui/hooks/createVariants';

import { ButtonSizeVariant, ButtonState, ButtonVariant } from './type';

type ButtonVariantProps = {
  intent: ButtonVariant;
  size: ButtonSizeVariant;
  state: ButtonState;
};

type ButtonTextVariantProps = {
  intent: ButtonVariant;
  size: ButtonSizeVariant;
};

export const useButtonVariants = createVariants<ButtonVariantProps, ViewStyle>({
  base: () => ({
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  }),
  variants: {
    intent: {
      primary: (t) => ({ backgroundColor: t.colors.aquaBlue[500] }),
      secondary: (t) => ({ backgroundColor: t.colors.neutral[100] }),
      ghost: (t) => ({ backgroundColor: t.colors.neutral.transparent }),
      destructive: (t) => ({ backgroundColor: t.colors.error[500] }),
      outline: (t) => ({
        backgroundColor: t.colors.neutral.transparent,
        borderWidth: 1,
        borderColor: t.colors.aquaBlue[500],
      }),
    },
    size: {
      sm: () => ({ minHeight: 32, paddingVertical: 4, paddingHorizontal: 12 }),
      md: () => ({ minHeight: 40, paddingVertical: 8, paddingHorizontal: 16 }),
      lg: () => ({ minHeight: 48, paddingVertical: 12, paddingHorizontal: 20 }),
    },
    state: {
      default: () => ({}),
      disabled: () => ({ opacity: 0.4 }),
      loading: () => ({ opacity: 0.7 }),
    },
  },
  defaultVariants: { intent: 'primary', size: 'md', state: 'default' },
  compoundVariants: [
    {
      when: { intent: 'ghost', state: 'disabled' },
      style: () => ({ opacity: 0.3 }),
    },
  ],
});

export const useButtonTextVariants = createVariants<ButtonTextVariantProps, TextStyle>({
  base: (t) => ({
    ...t.fonts.semiBold,
    fontSize: 14,
    textAlign: 'center',
  }),
  variants: {
    intent: {
      primary: (t) => ({ color: t.colors.neutral.white }),
      secondary: (t) => ({ color: t.colors.neutral[700] }),
      ghost: (t) => ({ color: t.colors.aquaBlue[500] }),
      destructive: (t) => ({ color: t.colors.neutral.white }),
      outline: (t) => ({ color: t.colors.aquaBlue[500] }),
    },
    size: {
      sm: () => ({ fontSize: 12 }),
      md: () => ({ fontSize: 14 }),
      lg: () => ({ fontSize: 16 }),
    },
  },
  defaultVariants: { intent: 'primary', size: 'md' },
});
