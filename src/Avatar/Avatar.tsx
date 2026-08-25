import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { css } from 'react-strict-dom';
import { View, Img } from '../internal/elements';

export interface AvatarProps extends BaseProps {
  /** Image source URI. When omitted, `initials` render instead. */
  src?: string;
  /** Initials shown when there is no image. */
  initials?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const styles = css.create({
  base: {
    borderRadius: '9999px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C8CDD6',
  },
  image: { width: '100%', height: '100%' },
  xs: { width: '20px', height: '20px' },
  sm: { width: '28px', height: '28px' },
  md: { width: '40px', height: '40px' },
  lg: { width: '56px', height: '56px' },
});

const SIZES = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as const;
const INITIAL_SIZES = { xs: 9, sm: 11, md: 14, lg: 20 } as const;

/** A user or entity representation — image or initials. */
export function Avatar({
  src,
  initials,
  size = 'md',
  xstyle,
  testID,
}: AvatarProps) {
  return (
    <View
      style={[styles.base, SIZES[size], xstyle]}
      accessibilityLabel={initials}
      testID={testID}
    >
      {src != null ? (
        <Img src={src} style={styles.image} />
      ) : (
        <Text size={INITIAL_SIZES[size]} weight="semibold" color="secondary">
          {initials ?? ''}
        </Text>
      )}
    </View>
  );
}
