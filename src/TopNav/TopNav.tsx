import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface TopNavItem {
  label: string;
  value: string;
  onPress?: () => void;
}

export interface TopNavProps extends BaseProps {
  title?: string;
  items?: readonly TopNavItem[];
  /** Controlled selected item (when `items` given). */
  value?: string;
  onItemPress?: (item: TopNavItem) => void;
  /** Right-side actions. */
  actions?: React.ReactNode;
  leading?: React.ReactNode;
}

const styles = css.create({
  base: {
    display: 'flex',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    paddingVertical: '10px',
    paddingHorizontal: '16px',
  },
});

/** A compact top app bar with optional inline navigation and actions. */
export function TopNav({
  title,
  items,
  value,
  onItemPress,
  actions,
  leading,
  xstyle,
  testID,
}: TopNavProps) {
  const tokens = useTokens();

  return (
    <View
      style={[
        styles.base,
        { borderBottomColor: tokens['--color-border'] as string },
        xstyle,
      ]}
      testID={testID}
    >
      <HStack gap={3} align="center" justify="space-between">
        <HStack gap={2} align="center">
          {leading}
          {title != null ? (
            <Text weight="semibold" size={17}>
              {title}
            </Text>
          ) : null}
          {items != null ? (
            <HStack gap={1} align="center" xstyle={{ marginStart: 8 }}>
              {items.map((item) => (
                <Btn
                  key={item.value}
                  onPress={() => onItemPress?.(item)}
                  accessibilityState={{ selected: item.value === value }}
                >
                  <Text
                    size={14}
                    weight={item.value === value ? 'semibold' : 'regular'}
                    color={item.value === value ? 'accent' : 'secondary'}
                  >
                    {item.label}
                  </Text>
                </Btn>
              ))}
            </HStack>
          ) : null}
        </HStack>
        {actions != null ? (
          <HStack gap={1} align="center">
            {actions}
          </HStack>
        ) : null}
      </HStack>
    </View>
  );
}
