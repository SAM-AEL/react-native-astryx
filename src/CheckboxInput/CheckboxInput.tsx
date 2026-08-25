import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, Txt, View } from '../internal/elements';

export interface CheckboxInputProps extends BaseProps {
  label?: string;
  /** Controlled checked state (upstream convention). */
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
  },
  box: {
    width: '22px',
    height: '22px',
    borderRadius: '6px',
    borderWidth: '2px',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  check: { fontSize: '14px', fontWeight: 700, color: '#FFFFFF' },
  label: { fontSize: '15px' },
});

/** A controlled checkbox with an optional label. */
export function CheckboxInput({
  label,
  checked,
  onCheckedChange,
  disabled = false,
  xstyle,
  testID,
}: CheckboxInputProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <Btn
      onPress={disabled ? undefined : () => onCheckedChange?.(!checked)}
      disabled={disabled}
      role="checkbox"
      accessibilityState={{ checked, disabled }}
      style={[styles.row, xstyle]}
      testID={testID}
    >
      <View
        style={[
          styles.box,
          {
            backgroundColor: checked
              ? (tokens['--color-accent'] as string)
              : 'transparent',
            borderColor: checked
              ? (tokens['--color-accent'] as string)
              : (tokens['--color-border-strong'] as string),
            opacity: disabled ? 0.5 : 1,
          },
          getComponentOverride(theme, 'checkboxinput'),
        ]}
      >
        {checked ? <Txt style={styles.check}>✓</Txt> : null}
      </View>
      {label != null ? (
        <Txt
          style={[
            styles.label,
            {
              color: tokens['--color-text-primary'] as string,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          {label}
        </Txt>
      ) : null}
    </Btn>
  );
}
