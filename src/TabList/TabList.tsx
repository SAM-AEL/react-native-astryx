import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface TabItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface TabListProps extends BaseProps {
  items: readonly TabItem[];
  /** Controlled selected tab value. */
  value: string;
  onChange?: (value: string) => void;
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
  },
  item: {
    paddingVertical: '10px',
    paddingHorizontal: '12px',
    marginBottom: '-1px',
    borderBottomWidth: '2px',
    borderBottomStyle: 'solid',
    display: 'flex',
  },
  disabled: { opacity: 0.5 },
});

/** Horizontal tab strip; pair with your own content switching. */
export function TabList({
  items,
  value,
  onChange,
  xstyle,
  testID,
}: TabListProps) {
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
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <Btn
            key={item.value}
            onPress={item.disabled ? undefined : () => onChange?.(item.value)}
            disabled={item.disabled}
            role="tab"
            accessibilityState={{ selected, disabled: item.disabled }}
            style={[
              styles.item,
              {
                borderBottomColor: selected
                  ? (tokens['--color-accent'] as string)
                  : 'transparent',
              },
              item.disabled === true ? styles.disabled : null,
            ]}
            testID={testID != null ? `${testID}-tab-${item.value}` : undefined}
          >
            <Text weight={selected ? 'semibold' : 'regular'} size={14}>
              {item.label}
            </Text>
          </Btn>
        );
      })}
    </View>
  );
}
