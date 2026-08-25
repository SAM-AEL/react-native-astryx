import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { Btn } from '../internal/elements';

export interface ComplexSelectorOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface ComplexSelectorProps extends BaseProps {
  options: readonly ComplexSelectorOption[];
  /** Controlled selected value. */
  value: string | null;
  onChange?: (value: string) => void;
}

const styles = css.create({
  option: {
    paddingVertical: '12px',
    paddingHorizontal: '12px',
    borderRadius: '10px',
    borderWidth: '2px',
    borderStyle: 'solid',
    marginBottom: '8px',
    display: 'flex',
  },
});

/** A rich single-select list where options carry descriptions. */
export function ComplexSelector({
  options,
  value,
  onChange,
  xstyle,
  testID,
}: ComplexSelectorProps) {
  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {options.map((option) => {
        const selected = option.value === value;
        const accent = selected
          ? ('--color-accent' as const)
          : ('--color-border' as const);
        return (
          <Btn
            key={option.value}
            disabled={option.disabled}
            onPress={() => onChange?.(option.value)}
            accessibilityState={{ selected, disabled: option.disabled }}
            style={[styles.option, { borderColor: accent }]}
          >
            <Text weight={selected ? 'semibold' : 'regular'}>
              {option.label}
            </Text>
            {option.description != null ? (
              <Text size={13} color="secondary">
                {option.description}
              </Text>
            ) : null}
          </Btn>
        );
      })}
    </VStack>
  );
}
