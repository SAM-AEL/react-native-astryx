import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export type ProgressColor = 'accent' | 'success' | 'warning' | 'critical';

export interface ProgressBarProps extends BaseProps {
  /** Value from 0 to `max`. Omit for indeterminate. */
  value?: number;
  max?: number;
  color?: ProgressColor;
  height?: number;
}

const styles = css.create({
  track: { borderRadius: '9999px', overflow: 'hidden', width: '100%' },
});

/** Horizontal progress indication; determinate when `value` is set. */
export function ProgressBar({
  value,
  max = 1,
  color = 'accent',
  height = 6,
  xstyle,
  testID,
}: ProgressBarProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  const clamped = value == null ? undefined : Math.min(Math.max(value, 0), max);
  const fillToken: Record<ProgressColor, string> = {
    accent: '--color-accent',
    success: '--color-success',
    warning: '--color-warning',
    critical: '--color-critical',
  };
  const indeterminateShift = clamped == null ? 0.3 : undefined;

  return (
    <View
      style={[
        styles.track,
        {
          height: `${height}px`,
          backgroundColor: tokens['--color-background-inset'] as string,
        },
        getComponentOverride(theme, 'progressbar'),
        xstyle,
      ]}
      testID={testID}
    >
      <View
        style={[
          styles.track,
          {
            backgroundColor: tokens[fillToken[color]] as string,
            width: clamped == null ? '40%' : `${(clamped / max) * 100}%`,
            marginStart: indeterminateShift != null ? '30%' : undefined,
          },
        ]}
      />
    </View>
  );
}
