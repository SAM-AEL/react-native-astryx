import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export type StatusColor =
  'success' | 'warning' | 'critical' | 'neutral' | 'accent';

export interface StatusDotProps extends BaseProps {
  color?: StatusColor;
  size?: number;
}

const styles = css.create({
  base: { borderRadius: '9999px' },
});

/** A small dot communicating status at a glance. */
export function StatusDot({
  color = 'neutral',
  size = 8,
  xstyle,
  testID,
}: StatusDotProps) {
  const tokens = useTokens();
  const tokenNames: Record<StatusColor, string> = {
    neutral: '--color-border-strong',
    accent: '--color-accent',
    success: '--color-success',
    warning: '--color-warning',
    critical: '--color-critical',
  };

  return (
    <View
      style={[
        styles.base,
        {
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: tokens[tokenNames[color]] as string,
        },
        xstyle,
      ]}
      testID={testID}
    />
  );
}
