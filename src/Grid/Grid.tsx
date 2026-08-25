import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { View } from '../internal/elements';

export interface GridProps extends BaseProps {
  children?: React.ReactNode;
  /** Number of columns. */
  columns?: number;
  /** Gap between cells in dp. */
  gap?: number;
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

/**
 * Column-count grid implemented with flex wrapping — the subset of CSS
 * grid that renders reliably on native.
 */
export function Grid({
  children,
  columns = 2,
  gap = 8,
  xstyle,
  testID,
}: GridProps) {
  const cell = `${(100 - (columns - 1) * (gap / 4)) / columns}%`;

  return (
    <View
      style={[styles.base, { rowGap: gap, columnGap: gap }, xstyle]}
      testID={testID}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <View key={i} style={{ width: cell, display: 'flex' }}>
              {child}
            </View>
          ))
        : children}
    </View>
  );
}
