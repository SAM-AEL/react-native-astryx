import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Badge } from '../Badge';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface NavIconProps extends BaseProps {
  /** Glyph or single character (see `GLYPHS`). */
  icon: string;
  /** Accessible name — required for icon-only nav items. */
  accessibilityLabel: string;
  selected?: boolean;
  /** Optional count badge overlaid on the corner. */
  badge?: string;
  onPress?: () => void;
}

const styles = css.create({
  base: {
    width: '44px',
    height: '36px',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'relative',
  },
  badgeWrap: {
    position: 'absolute',
    top: '-4px',
    end: '-2px',
  },
});

/** Navigation icon with selection state and an optional count badge. */
export function NavIcon({
  icon,
  accessibilityLabel,
  selected = false,
  badge,
  onPress,
  xstyle,
  testID,
}: NavIconProps) {
  const tokens = useTokens();

  return (
    <Btn
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      ariaInvalid={undefined}
      style={[
        styles.base,
        selected
          ? { backgroundColor: tokens['--color-accent-muted'] as string }
          : null,
        xstyle,
      ]}
      testID={testID}
    >
      <Text size={18} color={selected ? 'accent' : 'secondary'}>
        {icon}
      </Text>
      {badge != null ? (
        <View style={styles.badgeWrap}>
          <Badge label={badge} color="critical" filled={true} />
        </View>
      ) : null}
    </Btn>
  );
}
