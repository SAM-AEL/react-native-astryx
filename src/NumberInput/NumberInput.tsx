import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Input } from '../internal/elements';

export interface NumberInputProps extends BaseProps {
  /** Controlled numeric value; `null` represents an empty field. */
  value: number | null;
  onChange: (value: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
}

const styles = css.create({
  base: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingHorizontal: '12px',
    paddingVertical: '10px',
    fontSize: '15px',
    display: 'flex',
  },
});

function parseNumber(text: string): number | null {
  if (text.trim() === '') {
    return null;
  }
  const parsed = Number(text);
  return Number.isFinite(parsed) ? parsed : null;
}

/** A controlled numeric input with optional clamping. */
export function NumberInput({
  value,
  onChange,
  min,
  max,
  step,
  disabled = false,
  invalid = false,
  xstyle,
  testID,
}: NumberInputProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  const clamp = (n: number | null): number | null => {
    if (n == null) {
      return n;
    }
    let result = n;
    if (min != null) {
      result = Math.max(min, result);
    }
    if (max != null) {
      result = Math.min(max, result);
    }
    return result;
  };

  return (
    <Input
      value={value == null ? '' : String(value)}
      inputMode="decimal"
      onChange={(e) => {
        const raw =
          (e as unknown as { nativeEvent: { text?: string } }).nativeEvent
            ?.text ?? '';
        const next = parseNumber(raw);
        if (step != null && next != null) {
          onChange(clamp(next));
        } else {
          onChange(next);
        }
      }}
      editable={!disabled}
      ariaInvalid={invalid ? true : undefined}
      style={[
        styles.base,
        {
          backgroundColor: tokens['--color-background-body'] as string,
          borderColor: invalid
            ? (tokens['--color-critical'] as string)
            : (tokens['--color-border'] as string),
          color: tokens['--color-text-primary'] as string,
          opacity: disabled ? 0.5 : 1,
        },
        getComponentOverride(theme, 'numberinput'),
        xstyle,
      ]}
      testID={testID}
    />
  );
}
