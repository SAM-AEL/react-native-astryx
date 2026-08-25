import type { BaseProps } from '../BaseProps';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export interface CenterProps extends BaseProps {
  children?: React.ReactNode;
  /** Grow to fill the parent, centering within all available space. */
  grow?: boolean;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

/** Centers its single child on both axes. */
export function Center({
  children,
  grow = false,
  xstyle,
  testID,
}: CenterProps) {
  return (
    <View
      style={[styles.base, grow ? { flex: 1 } : null, xstyle]}
      testID={testID}
    >
      {children}
    </View>
  );
}
