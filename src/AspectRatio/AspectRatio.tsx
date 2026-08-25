import type { BaseProps } from '../BaseProps';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export interface AspectRatioProps extends BaseProps {
  children?: React.ReactNode;
  /** width / height ratio, e.g. 16/9. */
  ratio: number;
}

/** Constrains its child to a fixed aspect ratio. */
export function AspectRatio({
  children,
  ratio,
  xstyle,
  testID,
}: AspectRatioProps) {
  return (
    <View style={[styles.base, { aspectRatio: ratio }, xstyle]} testID={testID}>
      {children}
    </View>
  );
}

const styles = css.create({
  base: { display: 'flex', overflow: 'hidden' },
});
