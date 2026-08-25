import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Txt } from '../internal/elements';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'inverse'
  | 'accent'
  | 'success'
  | 'warning'
  | 'critical';

export interface TextProps extends BaseProps {
  children?: React.ReactNode;
  /** Semantic color token family (defaults to primary). */
  color?: TextColor;
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
  /** Render in the code font family. */
  mono?: boolean;
  /** Override the body font size in dp. */
  size?: number;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  selectable?: boolean;
}

const styles = css.create({
  base: {
    fontSize: '15px',
    lineHeight: 1.45,
  },
});

const WEIGHTS = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

const COLOR_TOKENS: Record<TextColor, string> = {
  primary: '--color-text-primary',
  secondary: '--color-text-secondary',
  tertiary: '--color-text-tertiary',
  inverse: '--color-text-inverse',
  accent: '--color-text-accent',
  success: '--color-text-success',
  warning: '--color-text-warning',
  critical: '--color-text-critical',
};

/**
 * The primitive for all body copy. Prefer `<Text>` over raw text nodes,
 * matching upstream's "components over primitives" rule.
 */
export function Text({
  children,
  color = 'primary',
  weight = 'regular',
  mono = false,
  size,
  align,
  numberOfLines,
  selectable = false,
  xstyle,
  testID,
}: TextProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  const tokenStyles: Record<string, string | number> = {
    color: tokens[COLOR_TOKENS[color]] as string,
    fontWeight: WEIGHTS[weight],
  };

  if (mono) {
    tokenStyles.fontFamily = tokens['--font-family-code'] as string;
  }
  if (align != null) {
    tokenStyles.textAlign = align;
  }
  if (size != null) {
    tokenStyles.fontSize = size;
  }

  return (
    <Txt
      style={[
        styles.base,
        tokenStyles,
        getComponentOverride(theme, 'text'),
        xstyle,
      ]}
      numberOfLines={numberOfLines}
      selectable={selectable}
      testID={testID}
    >
      {children}
    </Txt>
  );
}
