import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';

export interface TimestampProps extends BaseProps {
  date: Date | number | string;
  /** Intl.DateTimeFormat options; defaults to a medium datetime. */
  format?: Intl.DateTimeFormatOptions;
  color?: 'primary' | 'secondary' | 'tertiary';
}

/** A localized, consistently formatted timestamp. */
export function Timestamp({
  date,
  format,
  color = 'secondary',
  xstyle,
  testID,
}: TimestampProps) {
  const value = date instanceof Date ? date : new Date(date);
  const formatted = new Intl.DateTimeFormat(
    undefined,
    format ?? { dateStyle: 'medium', timeStyle: 'short' }
  ).format(Number.isNaN(value.getTime()) ? new Date() : value);

  return (
    <Text color={color} size={13} xstyle={xstyle} testID={testID}>
      {formatted}
    </Text>
  );
}
