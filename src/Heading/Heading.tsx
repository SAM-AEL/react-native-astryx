import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { H1, H2, H3, H4 } from '../internal/elements';

export type HeadingLevel = 1 | 2 | 3 | 4;

export interface HeadingProps extends BaseProps {
  children?: React.ReactNode;
  /** Semantic heading level; drives size and the underlying element. */
  level?: HeadingLevel;
  color?: 'primary' | 'secondary' | 'accent' | 'inverse';
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
}

const styles = css.create({
  h1: { fontSize: '32px', lineHeight: 1.2 },
  h2: { fontSize: '24px', lineHeight: 1.25 },
  h3: { fontSize: '20px', lineHeight: 1.3 },
  h4: { fontSize: '17px', lineHeight: 1.35 },
});

const LEVEL_ELEMENTS = { 1: H1, 2: H2, 3: H3, 4: H4 } as const;
const LEVEL_STYLES = {
  1: styles.h1,
  2: styles.h2,
  3: styles.h3,
  4: styles.h4,
} as const;
const COLOR_TOKENS = {
  primary: '--color-text-primary',
  secondary: '--color-text-secondary',
  accent: '--color-text-accent',
  inverse: '--color-text-inverse',
} as const;

/** Section heading rendered with semantic heading elements. */
export function Heading({
  children,
  level = 3,
  color = 'primary',
  align,
  numberOfLines,
  xstyle,
  testID,
}: HeadingProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();
  const Element = LEVEL_ELEMENTS[level];

  return (
    <Element
      style={[
        LEVEL_STYLES[level],
        {
          color: tokens[COLOR_TOKENS[color]] as string,
          fontFamily: tokens['--font-family-heading'] as string,
          textAlign: align,
        },
        getComponentOverride(theme, 'heading'),
        xstyle,
      ]}
      numberOfLines={numberOfLines}
      testID={testID}
    >
      {children}
    </Element>
  );
}
