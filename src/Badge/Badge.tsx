import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Txt, View } from '../internal/elements';

export type BadgeColor =
  'neutral' | 'accent' | 'success' | 'warning' | 'critical';

export interface BadgeProps extends BaseProps {
  /** The count or short enumerated state text. */
  label: string;
  color?: BadgeColor;
  /** Filled style instead of muted. */
  filled?: boolean;
}

const styles = css.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: '9999px',
    paddingHorizontal: '8px',
    paddingVertical: '2px',
  },
  label: { fontSize: '11px', fontWeight: 600 },
});

const MUTED_TOKENS: Record<BadgeColor, [string, string]> = {
  neutral: ['--color-background-inset', '--color-text-secondary'],
  accent: ['--color-accent-muted', '--color-text-accent'],
  success: ['--color-success-muted', '--color-text-success'],
  warning: ['--color-warning-muted', '--color-text-warning'],
  critical: ['--color-critical-muted', '--color-text-critical'],
};

const FILLED_TOKENS: Record<BadgeColor, [string, string]> = {
  neutral: ['--color-background-inverse', '--color-text-inverse'],
  accent: ['--color-accent', '--color-on-accent'],
  success: ['--color-success', '#FFFFFF'],
  warning: ['--color-warning', '#FFFFFF'],
  critical: ['--color-critical', '#FFFFFF'],
};

/**
 * Reserved for counts and enumerated states — not decoration
 * (use `StatusDot` or `Token` for status).
 */
export function Badge({
  label,
  color = 'neutral',
  filled = false,
  xstyle,
  testID,
}: BadgeProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();
  const [bgToken, fgToken] = (filled ? FILLED_TOKENS : MUTED_TOKENS)[color];

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: tokens[bgToken] as string,
        },
        getComponentOverride(theme, 'badge'),
        xstyle,
      ]}
      testID={testID}
    >
      <Txt style={[styles.label, { color: tokens[fgToken] as string }]}>
        {label}
      </Txt>
    </View>
  );
}
