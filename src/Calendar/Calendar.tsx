import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { HStack } from '../HStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface CalendarProps extends BaseProps {
  /** Controlled selected date (local midnight), or null. */
  value: Date | null;
  onChange?: (date: Date) => void;
  /** Month shown (any date within the month); defaults to the value or today. */
  month?: Date;
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const styles = css.create({
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '2px',
  },
  cell: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  weekday: { width: '40px' },
});

/** Month-grid date picker with a controlled value. */
export function Calendar({
  value,
  onChange,
  month,
  xstyle,
  testID,
}: CalendarProps) {
  const tokens = useTokens();
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const base = month ?? value ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const year = viewMonth.getFullYear();
  const monthIndex = viewMonth.getMonth();
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: Array<number | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const isSameDay = (a: Date | null, day: number) =>
    a != null &&
    a.getFullYear() === year &&
    a.getMonth() === monthIndex &&
    a.getDate() === day;

  const shiftMonth = (delta: number) => {
    setViewMonth(new Date(year, monthIndex + delta, 1));
  };

  return (
    <View style={xstyle} testID={testID}>
      <HStack gap={2} align="center" justify="space-between">
        <Btn accessibilityLabel="Previous month" onPress={() => shiftMonth(-1)}>
          <Text color="accent">‹</Text>
        </Btn>
        <Text weight="semibold">
          {viewMonth.toLocaleString(undefined, {
            month: 'long',
            year: 'numeric',
          })}
        </Text>
        <Btn accessibilityLabel="Next month" onPress={() => shiftMonth(1)}>
          <Text color="accent">›</Text>
        </Btn>
      </HStack>
      <View style={styles.grid}>
        {WEEKDAYS.map((d, i) => (
          <View key={`wd-${i}`} style={[styles.cell, styles.weekday]}>
            <Text size={11} color="tertiary">
              {d}
            </Text>
          </View>
        ))}
        {cells.map((day, i) => {
          if (day == null) {
            return <View key={`pad-${i}`} style={styles.cell} />;
          }
          const selected = isSameDay(value, day);
          return (
            <Btn
              key={`day-${day}`}
              onPress={() => onChange?.(new Date(year, monthIndex, day))}
              accessibilityLabel={String(day)}
              style={[
                styles.cell,
                selected
                  ? { backgroundColor: tokens['--color-accent'] as string }
                  : null,
              ]}
            >
              <Text color={selected ? 'inverse' : 'primary'} size={14}>
                {String(day)}
              </Text>
            </Btn>
          );
        })}
      </View>
    </View>
  );
}
