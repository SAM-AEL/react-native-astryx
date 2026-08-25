import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, View } from '../internal/elements';

export interface SegmentedControlItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SegmentedControlProps extends BaseProps {
  items: readonly SegmentedControlItem[];
  /** Controlled selected value (upstream convention). */
  value: string;
  onChange?: (value: string) => void;
}

const styles = css.create({
  base: {
    borderRadius: '9px',
    padding: '2px',
    display: 'flex',
    alignSelf: 'flex-start',
  },
  item: {
    paddingHorizontal: '14px',
    paddingVertical: '7px',
    borderRadius: '7px',
    display: 'flex',
  },
});

/** A controlled segmented picker for mutually exclusive options. */
export function SegmentedControl({
  items,
  value,
  onChange,
  xstyle,
  testID,
}: SegmentedControlProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: tokens['--color-background-inset'] as string },
        getComponentOverride(theme, 'segmentedcontrol'),
        xstyle,
      ]}
      testID={testID}
    >
      <HStack gap={1}>
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
                  backgroundColor: selected
                    ? (tokens['--color-background-body'] as string)
                    : 'transparent',
                  opacity: item.disabled ? 0.5 : 1,
                },
              ]}
            >
              <Text size={13} weight={selected ? 'semibold' : 'regular'}>
                {item.label}
              </Text>
            </Btn>
          );
        })}
      </HStack>
    </View>
  );
}
