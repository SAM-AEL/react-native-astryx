import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens, type TokenMap } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, Txt } from '../internal/elements';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends BaseProps {
  /** Button text — upstream parity: label is the primary prop. */
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
  /** Shows a spinner and blocks interaction. */
  loading?: boolean;
  /** Optional leading icon name (see `Icon`). */
  icon?: string;
  /** Stretch to the full available width. */
  block?: boolean;
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    gap: '8px',
  },
  sm: { paddingHorizontal: '10px', paddingVertical: '6px' },
  md: { paddingHorizontal: '16px', paddingVertical: '10px' },
  lg: { paddingHorizontal: '22px', paddingVertical: '14px' },
  labelSm: { fontSize: '13px' },
  labelMd: { fontSize: '15px' },
  labelLg: { fontSize: '17px' },
});

const SIZES = { sm: styles.sm, md: styles.md, lg: styles.lg } as const;
const LABEL_SIZES = {
  sm: styles.labelSm,
  md: styles.labelMd,
  lg: styles.labelLg,
} as const;

function colorsFor(
  tokens: TokenMap,
  variant: ButtonVariant,
  disabled: boolean
): Record<string, string | number> {
  if (disabled) {
    return {
      backgroundColor:
        variant === 'ghost'
          ? 'transparent'
          : (tokens['--color-background-inset'] as string),
      borderColor:
        variant === 'primary'
          ? 'transparent'
          : (tokens['--color-border'] as string),
      color: tokens['--color-text-tertiary'] as string,
    };
  }
  switch (variant) {
    case 'primary':
      return {
        backgroundColor: tokens['--color-accent'] as string,
        borderColor: 'transparent',
        color: tokens['--color-on-accent'] as string,
      };
    case 'secondary':
      return {
        backgroundColor: tokens['--color-background-surface'] as string,
        borderColor: tokens['--color-border'] as string,
        color: tokens['--color-text-primary'] as string,
      };
    case 'destructive':
      return {
        backgroundColor: tokens['--color-critical'] as string,
        borderColor: 'transparent',
        color: '#FFFFFF',
      };
    case 'ghost':
      return {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        color: tokens['--color-text-accent'] as string,
      };
  }
}

/**
 * The primary action component. Controlled conventions apply: it never
 * manages its own state; drive `loading`/`disabled` from above.
 */
export function Button({
  label,
  variant = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  loading = false,
  icon,
  block = false,
  xstyle,
  testID,
}: ButtonProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();
  const inactive = disabled || loading;

  return (
    <Btn
      onPress={inactive ? undefined : onPress}
      disabled={inactive}
      accessibilityState={{ disabled: inactive, busy: loading }}
      style={[
        styles.base,
        SIZES[size],
        colorsFor(tokens, variant, inactive),
        block ? { width: '100%', alignSelf: 'stretch' } : null,
        getComponentOverride(theme, 'button'),
        getComponentOverride(theme, 'button', `variant:${variant}`),
        xstyle,
      ]}
      testID={testID}
    >
      {icon != null ? <IconGlyph name={icon} /> : null}
      <Txt
        style={[
          LABEL_SIZES[size],
          { fontWeight: 600 },
          getComponentOverride(theme, 'button-label'),
        ]}
      >
        {label}
      </Txt>
    </Btn>
  );
}

/** Minimal inline glyph used by `icon` until a full Icon set lands. */
function IconGlyph({ name }: { name: string }) {
  return (
    <Txt
      style={[{ fontSize: '16px' }, { color: 'inherit' }]}
      aria-hidden={true}
    >
      {name}
    </Txt>
  );
}
