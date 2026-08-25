import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Calendar } from '../Calendar';
import { FieldLabel } from '../Field';
import { Text, type TextColor } from '../Text';
import { HStack } from '../HStack';
import { View } from '../internal/elements';

export interface DateRangeInputProps extends BaseProps {
  /** Controlled [start, end] range; either side may be null. */
  value: readonly [Date | null, Date | null];
  onChange?: (range: readonly [Date | null, Date | null]) => void;
  label?: string;
}

const styles = css.create({
  hint: {
    display: 'flex',
    paddingHorizontal: '4px',
    paddingTop: '8px',
  },
});

function fmt(d: Date | null): string {
  return d == null
    ? '—'
    : d.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

/**
 * A start/end range picker backed by the Calendar grid. The first tap
 * sets the start; the second completes the range.
 */
export function DateRangeInput({
  value,
  onChange,
  label,
  xstyle,
  testID,
}: DateRangeInputProps) {
  const [start, end] = value;
  const pickingEnd = start != null && end == null;

  const pick = (date: Date) => {
    if (!pickingEnd) {
      onChange?.([date, null]);
    } else {
      const [s] = [start];
      if (s != null && date < s) {
        onChange?.([date, s]);
      } else {
        onChange?.([s, date]);
      }
    }
  };

  const hintColor: TextColor = pickingEnd ? 'accent' : 'secondary';

  return (
    <View xstyle={xstyle} testID={testID}>
      {label != null ? <FieldLabel>{label}</FieldLabel> : null}
      <Calendar value={start} onChange={pick} />
      <HStack gap={2} align="center" xstyle={styles.hint}>
        <Text size={13} color="secondary">
          Start:
        </Text>
        <Text size={13} weight="medium">
          {fmt(start)}
        </Text>
        <Text size={13} color="secondary">
          End:
        </Text>
        <Text size={13} weight="medium" color={hintColor as TextColor}>
          {fmt(end)}
        </Text>
      </HStack>
    </View>
  );
}
