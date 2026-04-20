export const FONT_VARIANTS = {
  regular: { fontFamily: 'NotoSans-Regular', fontWeight: '400' },
  regularItalic: { fontFamily: 'NotoSans-Italic', fontWeight: '400' },
  medium: { fontFamily: 'NotoSans-Medium', fontWeight: '500' },
  mediumItalic: { fontFamily: 'NotoSans-MediumItalic', fontWeight: '500' },
  semiBold: { fontFamily: 'NotoSans-SemiBold', fontWeight: '600' },
  semiBoldItalic: { fontFamily: 'NotoSans-SemiBoldItalic', fontWeight: '600' },
  bold: { fontFamily: 'NotoSans-Bold', fontWeight: '700' },
  boldItalic: { fontFamily: 'NotoSans-BoldItalic', fontWeight: '700' },
  displayRegular: { fontFamily: 'NotoSans-Regular', fontWeight: '400' },
  displayMedium: { fontFamily: 'NotoSans-Medium', fontWeight: '500' },
  displaySemiBold: { fontFamily: 'NotoSans-SemiBold', fontWeight: '600' },
  displayBold: { fontFamily: 'NotoSans-Bold', fontWeight: '700' },
} as const;

export type CustomTextVariant = keyof typeof FONT_VARIANTS;
