import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface ResizableProps extends BaseProps {
  /** Panel A content. */
  start: React.ReactNode;
  /** Panel B content. */
  end: React.ReactNode;
  /** Initial share of width for panel A (0–1). */
  initialSplit?: number;
  onSplitChange?: (split: number) => void;
}

const HANDLE = 16;

const styles = css.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  handleWrap: {
    width: `${HANDLE}px`,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  handle: {
    width: '4px',
    height: '40%',
    borderRadius: '9999px',
  },
  pane: { flex: 1, minWidth: 0, display: 'flex' },
});

/**
 * Two horizontally resizable panes with a draggable divider. Native
 * adaptation of the desktop resize pattern.
 */
export function Resizable({
  start,
  end,
  initialSplit = 0.5,
  onSplitChange,
  xstyle,
  testID,
}: ResizableProps) {
  const tokens = useTokens();
  const [width, setWidth] = useState(0);
  const [split, setSplit] = useState(initialSplit);

  const apply = (x: number | undefined) => {
    if (x == null || width <= 0) return;
    const next = Math.min(0.85, Math.max(0.15, x / width));
    setSplit(next);
    onSplitChange?.(next);
  };

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout?.width ?? 0)}
      xstyle={[styles.root, xstyle]}
      testID={testID}
    >
      <View style={[styles.pane, { flexBasis: `${split * 100}%` }]}>
        {start}
      </View>
      <View
        onTouchStart={(e) => apply(e.nativeEvent.locationX)}
        onTouchMove={(e) => apply(e.nativeEvent.locationX)}
        xstyle={styles.handleWrap}
      >
        <View
          xstyle={[
            styles.handle,
            { backgroundColor: tokens['--color-border-strong'] as string },
          ]}
        />
      </View>
      <View style={styles.pane}>{end}</View>
    </View>
  );
}

export function useResizable(initialSplit = 0.5) {
  const [split, setSplit] = useState(initialSplit);
  return { split, setSplit };
}
