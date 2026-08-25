import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';
import { Txt } from '../internal/elements';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg';

/**
 * Built-in glyph set. Values are unicode symbols that render on both
 * iOS and Android system fonts — no font file to load.
 */
export const GLYPHS = {
  check: '✓',
  close: '✕',
  chevronLeft: '‹',
  chevronRight: '›',
  chevronDown: '▾',
  chevronUp: '▴',
  search: '⌕',
  plus: '＋',
  minus: '−',
  info: 'ⓘ',
  warning: '⚠',
  error: '✖',
  calendar: '📅',
  star: '★',
  heart: '♥',
  settings: '⚙',
  user: '👤',
  bell: '🔔',
  home: '⌂',
  trash: '🗑',
} as const;

export type IconName = keyof typeof GLYPHS;

export interface IconProps extends BaseProps {
  name: IconName;
  size?: IconSize;
  color?:
    'primary' | 'secondary' | 'accent' | 'critical' | 'success' | 'warning';
}

const SIZES: Record<IconSize, string> = {
  xs: '12px',
  sm: '16px',
  md: '20px',
  lg: '28px',
};

const COLORS: Record<string, string> = {
  primary: '--color-text-primary',
  secondary: '--color-text-secondary',
  accent: '--color-text-accent',
  critical: '--color-text-critical',
  success: '--color-text-success',
  warning: '--color-text-warning',
};

/** A named symbol from the built-in glyph set. */
export function Icon({
  name,
  size = 'md',
  color = 'secondary',
  xstyle,
  testID,
}: IconProps) {
  const tokens = useTokens();

  return (
    <Txt
      aria-hidden={true}
      style={[
        styles.base,
        {
          fontSize: SIZES[size],
          color: tokens[COLORS[color] ?? '--color-text-secondary'] as string,
        },
        xstyle,
      ]}
      testID={testID}
    >
      {GLYPHS[name]}
    </Txt>
  );
}

const styles = css.create({
  base: { display: 'flex' },
});
