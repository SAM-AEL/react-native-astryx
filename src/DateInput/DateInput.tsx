import { useState } from 'react';
import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { FieldLabel } from '../Field';
import { Text } from '../Text';
import { Button } from '../Button';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Calendar } from '../Calendar';
import { Btn, View } from '../internal/elements';

export interface DateInputProps extends BaseProps {
  /** Controlled selected date, or null for empty. */
  value: Date | null;
  onChange?: (date: Date | null) => void;
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
    display: 'flex',
  },
});

/** A controlled date field opening a native calendar sheet. */
export function DateInput({
  value,
  onChange,
  placeholder = 'Pick a date',
  label,
  xstyle,
  testID,
}: DateInputProps) {
  const tokens = useTokens();
  const [open, setOpen] = useState(false);

  const formatted =
    value == null
      ? null
      : value.toLocaleDateString(undefined, { dateStyle: 'medium' });

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
        <Text color={formatted == null ? 'tertiary' : 'primary'}>
          {formatted ?? placeholder}
        </Text>
        <Text color="tertiary">📅</Text>
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
            <VStack gap={4}>
              <Calendar
                value={value}
                onChange={(d) => {
                  onChange?.(d);
                  setOpen(false);
                }}
              />
              {value != null ? (
                <Button
                  label="Clear"
                  variant="ghost"
                  size="sm"
                  onPress={() => {
                    onChange?.(null);
                    setOpen(false);
                  }}
                />
              ) : null}
            </VStack>
          </View>
        </View>
      </Modal>
    </View>
  );
}
