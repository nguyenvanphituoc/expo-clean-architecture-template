import { useMemo } from 'react';

import { AppTheme } from '@/theme/type';
import { useTheme } from '@/ui/providers/ThemeProvider';

type VariantMap<V extends string, S extends object> = {
  [K in V]: (theme: AppTheme) => S;
};

export type VariantConfig<Props extends Record<string, string>, S extends object> = {
  base?: (theme: AppTheme) => S;
  variants: {
    [K in keyof Props]: VariantMap<Props[K], S>;
  };
  defaultVariants?: Partial<Props>;
  compoundVariants?: Array<{
    when: Partial<Props>;
    style: (theme: AppTheme) => S;
  }>;
};

export function createVariants<Props extends Record<string, string>, S extends object>(
  config: VariantConfig<Props, S>,
) {
  return function useVariants(selected: Partial<Props> = {}): S[] {
    const theme = useTheme();

    const selectedKey = Object.entries(selected)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v ?? ''}`)
      .join('|');

    return useMemo(() => {
      const styles: S[] = [];

      if (config.base) {
        styles.push(config.base(theme));
      }

      for (const axis of Object.keys(config.variants) as Array<keyof Props>) {
        const variantValue = (selected[axis] ?? config.defaultVariants?.[axis]) as Props[typeof axis] | undefined;
        if (!variantValue) continue;

        const styleFactory = config.variants[axis][variantValue];
        if (styleFactory) {
          styles.push(styleFactory(theme));
        }
      }

      if (config.compoundVariants) {
        for (const compound of config.compoundVariants) {
          const match = Object.entries(compound.when).every(([k, v]) => {
            const key = k as keyof Props;
            return (selected[key] ?? config.defaultVariants?.[key]) === v;
          });
          if (match) {
            styles.push(compound.style(theme));
          }
        }
      }

      return styles;
    }, [selectedKey, theme]);
  };
}
