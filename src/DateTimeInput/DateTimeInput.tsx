import type { BaseProps } from '../BaseProps';
import { DateInput } from '../DateInput';
import { TimeInput } from '../TimeInput';
import { VStack } from '../VStack';

export interface DateTimeInputProps extends BaseProps {
  /** Controlled combined datetime, or null. */
  value: Date | null;
  onChange?: (value: Date | null) => void;
  label?: string;
}

/** A date + time picker composed from `DateInput` and `TimeInput`. */
export function DateTimeInput({
  value,
  onChange,
  label,
  xstyle,
  testID,
}: DateTimeInputProps) {
  const hh = value == null ? null : String(value.getHours()).padStart(2, '0');
  const mm = value == null ? null : String(value.getMinutes()).padStart(2, '0');

  return (
    <VStack gap={3} xstyle={xstyle} testID={testID}>
      <DateInput
        label={label}
        value={value}
        onChange={(d) => {
          if (d == null) {
            onChange?.(null);
            return;
          }
          const next = new Date(d);
          if (value != null) {
            next.setHours(value.getHours(), value.getMinutes());
          }
          onChange?.(next);
        }}
      />
      {hh != null && mm != null ? (
        <TimeInput
          value={`${hh}:${mm}`}
          onChange={(t) => {
            const [h, m] = t.split(':').map(Number);
            const next = new Date(value ?? new Date());
            next.setHours(h ?? 0, m ?? 0);
            onChange?.(next);
          }}
        />
      ) : null}
    </VStack>
  );
}
