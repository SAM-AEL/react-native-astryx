import { useState } from 'react';
import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { FieldLabel } from '../Field';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface MultiSelectorOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface MultiSelectorProps extends BaseProps {
  options: readonly MultiSelectorOption[];
  /** Controlled array of selected values. */
  value: readonly string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  /** Confirm button text inside the sheet. */
  confirmLabel?: string;
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
    maxHeight: '70%',
    display: 'flex',
  },
  confirm: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: '12px',
    borderRadius: '8px',
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

/** A multi-select picker rendered as a native bottom-sheet checklist. */
export function MultiSelector({
  options,
  value,
  onChange,
  placeholder = 'Select…',
  label,
  confirmLabel = 'Done',
  xstyle,
  testID,
}: MultiSelectorProps) {
  const tokens = useTokens();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<readonly string[]>(value);

  const summary = value.length === 0 ? placeholder : `${value.length} selected`;

  return (
    <View>
      {label != null ? <FieldLabel>{label}</FieldLabel> : null}
      <Btn
        onPress={() => {
          setDraft(value);
          setOpen(true);
        }}
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
        <Text color={value.length === 0 ? 'tertiary' : 'primary'}>
          {summary}
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
            <VStack gap={3}>
              <FieldLabel>{label ?? 'Select multiple'}</FieldLabel>
              <VStack gap={0}>
                {options.map((option) => (
                  <Btn
                    key={option.value}
                    disabled={option.disabled}
                    onPress={() =>
                      setDraft((d) =>
                        d.includes(option.value)
                          ? d.filter((v) => v !== option.value)
                          : [...d, option.value]
                      )
                    }
                    style={[
                      styles.option,
                      {
                        borderBottomColor: tokens['--color-border'] as string,
                        opacity: option.disabled ? 0.5 : 1,
                      },
                    ]}
                  >
                    <Text>{option.label}</Text>
                    <Text
                      color={
                        draft.includes(option.value) ? 'accent' : 'tertiary'
                      }
                    >
                      {draft.includes(option.value) ? '☑' : '☐'}
                    </Text>
                  </Btn>
                ))}
              </VStack>
              <Btn
                onPress={() => {
                  onChange?.([...draft]);
                  setOpen(false);
                }}
                style={styles.confirm}
              >
                <Text color="accent" weight="semibold">
                  {confirmLabel}
                </Text>
              </Btn>
            </VStack>
          </View>
        </View>
      </Modal>
    </View>
  );
}
