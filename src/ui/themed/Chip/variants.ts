import { TextStyle, ViewStyle } from 'react-native';

import { createVariants } from '@/ui/hooks/createVariants';

import { ChipIntent, ChipSize } from './type';

type ChipVariantProps = {
  intent: ChipIntent;
  size: ChipSize;
};

export const useChipVariants = createVariants<ChipVariantProps, ViewStyle>({
  base: () => ({
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 999,
    gap: 4,
  }),
  variants: {
    intent: {
      default: (t) => ({
        backgroundColor: t.colors.neutral[100],
        borderWidth: 1,
        borderColor: t.colors.neutral[300],
      }),
      info: (t) => ({ backgroundColor: t.colors.aquaBlue[100] }),
      success: (t) => ({ backgroundColor: t.colors.success[100] }),
      warning: (t) => ({ backgroundColor: t.colors.warning[100] }),
      error: (t) => ({ backgroundColor: t.colors.error[100] }),
    },
    size: {
      sm: () => ({ paddingHorizontal: 8, paddingVertical: 3 }),
      md: () => ({ paddingHorizontal: 12, paddingVertical: 5 }),
    },
  },
  defaultVariants: { intent: 'default', size: 'md' },
  compoundVariants: [
    {
      when: { intent: 'error', size: 'md' },
      style: (t) => ({ borderWidth: 1, borderColor: t.colors.error[300] }),
    },
  ],
});

export const useChipLabelVariants = createVariants<ChipVariantProps, TextStyle>({
  base: (t) => ({ ...t.fonts.medium }),
  variants: {
    intent: {
      default: (t) => ({ color: t.colors.neutral[700] }),
      info: (t) => ({ color: t.colors.aquaBlue[700] }),
      success: (t) => ({ color: t.colors.success[700] }),
      warning: (t) => ({ color: t.colors.warning[700] }),
      error: (t) => ({ color: t.colors.error[700] }),
    },
    size: {
      sm: () => ({ fontSize: 11 }),
      md: () => ({ fontSize: 12 }),
    },
  },
  defaultVariants: { intent: 'default', size: 'md' },
});
