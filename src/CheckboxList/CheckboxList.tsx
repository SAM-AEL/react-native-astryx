import type { BaseProps } from '../BaseProps';
import { CheckboxInput } from '../CheckboxInput';
import { VStack } from '../VStack';

export interface CheckboxListItem {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CheckboxListProps extends BaseProps {
  items: readonly CheckboxListItem[];
  /** Controlled set of checked values. */
  value: readonly string[];
  onChange?: (values: string[]) => void;
}

/** A controlled group of checkboxes backed by an array of values. */
export function CheckboxList({
  items,
  value,
  onChange,
  xstyle,
  testID,
}: CheckboxListProps) {
  const toggle = (v: string) => {
    onChange?.(
      value.includes(v) ? value.filter((x) => x !== v) : [...value, v]
    );
  };

  return (
    <VStack gap={2} xstyle={xstyle} testID={testID}>
      {items.map((item) => (
        <CheckboxInput
          key={item.value}
          label={item.label}
          checked={value.includes(item.value)}
          disabled={item.disabled}
          onCheckedChange={() => toggle(item.value)}
        />
      ))}
    </VStack>
  );
}
