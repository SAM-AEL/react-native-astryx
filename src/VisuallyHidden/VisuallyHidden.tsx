import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { View } from '../internal/elements';

export interface VisuallyHiddenProps extends BaseProps {
  children?: React.ReactNode;
}

const styles = css.create({
  base: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    opacity: 0,
    overflow: 'hidden',
  },
});

/** Keeps content for screen readers while hiding it visually. */
export function VisuallyHidden({
  children,
  xstyle,
  testID,
}: VisuallyHiddenProps) {
  return (
    <View style={[styles.base, xstyle]} testID={testID}>
      {children}
    </View>
  );
}
