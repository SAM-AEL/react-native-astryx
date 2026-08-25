import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export interface SpinnerProps extends BaseProps {
  size?: 'sm' | 'md' | 'lg';
  /** Render using the accent color. */
  accent?: boolean;
}

const SIZES = { sm: 16, md: 24, lg: 32 } as const;

/**
 * An indeterminate spinner rendered with the native activity
 * indicator for platform-correct motion.
 */
export function Spinner({
  size = 'md',
  accent = false,
  xstyle,
  testID,
}: SpinnerProps) {
  const tokens = useTokens();
  const dim = SIZES[size];

  return (
    <View
      style={[{ width: `${dim}px`, height: `${dim}px` }, xstyle]}
      testID={testID}
    >
      <View
        style={[
          styles.track,
          {
            width: `${dim}px`,
            height: `${dim}px`,
            borderWidth: `${Math.max(2, Math.round(dim / 8))}px`,
            borderTopColor: accent
              ? (tokens['--color-accent'] as string)
              : (tokens['--color-text-secondary'] as string),
          },
        ]}
      />
    </View>
  );
}

const styles = css.create({
  track: {
    borderRadius: '9999px',
    borderStyle: 'solid',
    borderColor: 'transparent',
  },
});
