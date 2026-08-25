import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens, useOptionalTheme } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, View } from '../internal/elements';

export interface RadioListItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioListProps extends BaseProps {
  items: readonly RadioListItem[];
  /** Controlled selected value (upstream convention). */
  value: string | null;
  onChange?: (value: string) => void;
}

const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    paddingVertical: '10px',
  },
  ring: {
    width: '22px',
    height: '22px',
    borderRadius: '9999px',
    borderWidth: '2px',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  dot: {
    width: '10px',
    height: '10px',
    borderRadius: '9999px',
    backgroundColor: '#FFFFFF',
  },
});

/** A controlled radio group rendered as rows. */
export function RadioList({
  items,
  value,
  onChange,
  xstyle,
  testID,
}: RadioListProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {items.map((item) => {
        const selected = item.value === value;
        return (
          <Btn
            key={item.value}
            onPress={item.disabled ? undefined : () => onChange?.(item.value)}
            disabled={item.disabled}
            role="radio"
            accessibilityState={{ checked: selected, disabled: item.disabled }}
            style={[
              styles.row,
              getComponentOverride(theme, 'radiolist', `item:${item.value}`),
            ]}
          >
            <View
              style={[
                styles.ring,
                {
                  borderColor: selected
                    ? (tokens['--color-accent'] as string)
                    : (tokens['--color-border-strong'] as string),
                  backgroundColor: selected
                    ? (tokens['--color-accent'] as string)
                    : 'transparent',
                },
              ]}
            >
              {selected ? <View style={styles.dot} /> : null}
            </View>
            <Text color={item.disabled ? 'tertiary' : 'primary'}>
              {item.label}
            </Text>
          </Btn>
        );
      })}
    </VStack>
  );
}
