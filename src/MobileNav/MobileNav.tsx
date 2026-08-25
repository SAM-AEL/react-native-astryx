import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface MobileNavItem {
  value: string;
  icon: string;
  label: string;
  badge?: string;
}

export interface MobileNavProps extends BaseProps {
  items: readonly [MobileNavItem, ...MobileNavItem[]];
  /** Controlled selected tab value. */
  value: string;
  onChange?: (value: string) => void;
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    paddingVertical: '6px',
    paddingBottom: '12px',
    paddingHorizontal: '8px',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    paddingVertical: '4px',
    paddingHorizontal: '10px',
    borderRadius: '8px',
  },
});

/** The phone-native bottom tab bar. */
export function MobileNav({
  items,
  value,
  onChange,
  xstyle,
  testID,
}: MobileNavProps) {
  const tokens = useTokens();

  return (
    <View
      style={[
        styles.base,
        { borderTopColor: tokens['--color-border'] as string },
        xstyle,
      ]}
      testID={testID}
    >
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <Btn
            key={item.value}
            onPress={() => onChange?.(item.value)}
            accessibilityLabel={item.label}
            accessibilityState={{ selected }}
            style={styles.item}
            testID={testID != null ? `${testID}-${item.value}` : undefined}
          >
            <Text size={17} color={selected ? 'accent' : 'tertiary'}>
              {item.icon}
            </Text>
            <Text
              size={11}
              weight={selected ? 'semibold' : 'regular'}
              color={selected ? 'accent' : 'tertiary'}
            >
              {item.label}
            </Text>
          </Btn>
        );
      })}
    </View>
  );
}
