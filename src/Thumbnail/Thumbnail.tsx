import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Img, View } from '../internal/elements';

export interface ThumbnailProps extends BaseProps {
  /** Image URI. */
  src: string;
  size?: 'sm' | 'md' | 'lg';
}

const SIZES = { sm: 48, md: 80, lg: 120 } as const;

const styles = css.create({
  frame: {
    borderRadius: '10px',
    overflow: 'hidden',
    backgroundColor: '#E4E6EA',
    display: 'flex',
  },
  image: { width: '100%', height: '100%' },
});

/** A compact square image preview. */
export function Thumbnail({
  src,
  size = 'md',
  xstyle,
  testID,
}: ThumbnailProps) {
  const dim = `${SIZES[size]}px`;

  return (
    <View
      style={[styles.frame, { width: dim, height: dim }, xstyle]}
      testID={testID}
    >
      <Img src={src} style={styles.image} accessibilityLabel="" />
    </View>
  );
}
