import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export type SkeletonShape = 'text' | 'rect' | 'circle';

export interface SkeletonProps extends BaseProps {
  shape?: SkeletonShape;
  /** Width in dp (ignored for `circle`, which uses `size`). */
  width?: number;
  height?: number;
  /** Diameter for `circle`. */
  size?: number;
}

/** Placeholder shimmer block shown while content loads. */
export function Skeleton({
  shape = 'text',
  width,
  height,
  size = 32,
  xstyle,
  testID,
}: SkeletonProps) {
  const tokens = useTokens();

  const dims: Record<string, string | number | undefined> =
    shape === 'circle'
      ? { width: `${size}px`, height: `${size}px` }
      : {
          width: width == null ? '100%' : `${width}px`,
          height: `${height ?? (shape === 'text' ? 14 : 80)}px`,
        };

  return (
    <View
      style={[
        styles.base,
        shape === 'circle'
          ? styles.circle
          : shape === 'text'
            ? styles.text
            : styles.rect,
        {
          ...dims,
          backgroundColor: tokens['--color-background-inset'] as string,
        },
        xstyle,
      ]}
      testID={testID}
    />
  );
}

const styles = css.create({
  base: { opacity: 0.9 },
  text: { borderRadius: '4px' },
  rect: { borderRadius: '8px' },
  circle: { borderRadius: '9999px' },
});
