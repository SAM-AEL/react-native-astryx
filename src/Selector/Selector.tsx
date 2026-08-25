import { useState } from 'react';
import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { FieldLabel } from '../Field';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface SelectorOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectorProps extends BaseProps {
  options: readonly SelectorOption[];
  /** Controlled selected value; `null` = nothing selected. */
  value: string | null;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
}

const styles = css.create({
  trigger: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingHorizontal: '12px',
    paddingVertical: '10px',
  },
  sheetWrap: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  backdrop: { flex: 1 },
  panel: {
    borderTopStartRadius: '16px',
    borderTopEndRadius: '16px',
    padding: '16px',
    paddingBottom: '40px',
    maxHeight: '60%',
    display: 'flex',
  },
  option: {
    paddingVertical: '14px',
    paddingHorizontal: '8px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

/**
 * A single-select picker rendered as a native bottom-sheet list —
 * the touch-first equivalent of upstream's `Selector`.
 */
export function Selector({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  label,
  xstyle,
  testID,
}: SelectorProps) {
  const tokens = useTokens();
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <View>
      {label != null ? <FieldLabel>{label}</FieldLabel> : null}
      <Btn
        onPress={() => setOpen(true)}
        style={[
          styles.trigger,
          {
            backgroundColor: tokens['--color-background-body'] as string,
            borderColor: tokens['--color-border'] as string,
          },
          xstyle,
        ]}
        testID={testID}
      >
        <Text color={selected == null ? 'tertiary' : 'primary'}>
          {selected?.label ?? placeholder}
        </Text>
        <Text color="tertiary">▾</Text>
      </Btn>
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
      >
        <View style={styles.sheetWrap}>
          <Btn
            accessibilityLabel="Close"
            onPress={() => setOpen(false)}
            style={[
              styles.backdrop,
              { backgroundColor: tokens['--color-overlay'] as string },
            ]}
          />
          <View
            style={[
              styles.panel,
              { backgroundColor: tokens['--color-background-body'] as string },
            ]}
          >
            <VStack gap={0}>
              {options.map((option) => (
                <Btn
                  key={option.value}
                  disabled={option.disabled}
                  onPress={() => {
                    onChange?.(option.value);
                    setOpen(false);
                  }}
                  style={[
                    styles.option,
                    {
                      borderBottomColor: tokens['--color-border'] as string,
                      opacity: option.disabled ? 0.5 : 1,
                    },
                  ]}
                >
                  <Text>{option.label}</Text>
                  {option.value === value ? (
                    <Text color="accent" weight="semibold">
                      ✓
                    </Text>
                  ) : null}
                </Btn>
              ))}
            </VStack>
          </View>
        </View>
      </Modal>
    </View>
  );
}
