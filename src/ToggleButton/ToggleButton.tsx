import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, Txt } from '../internal/elements';

export interface ToggleButtonProps extends BaseProps {
  label: string;
  /** Controlled selected state. */
  selected: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingHorizontal: '14px',
    paddingVertical: '8px',
  },
  label: { fontSize: '14px' },
});

/** A two-state button driven by a controlled `selected` prop. */
export function ToggleButton({
  label,
  selected,
  onChange,
  disabled = false,
  xstyle,
  testID,
}: ToggleButtonProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <Btn
      onPress={disabled ? undefined : () => onChange?.(!selected)}
      disabled={disabled}
      role="switch"
      accessibilityState={{ checked: selected, disabled }}
      style={[
        styles.base,
        {
          backgroundColor: selected
            ? (tokens['--color-accent-muted'] as string)
            : (tokens['--color-background-surface'] as string),
          borderColor: selected
            ? (tokens['--color-accent'] as string)
            : (tokens['--color-border'] as string),
        },
        getComponentOverride(theme, 'togglebutton'),
        xstyle,
      ]}
      testID={testID}
    >
      <Txt
        style={[
          styles.label,
          {
            color: selected
              ? (tokens['--color-text-accent'] as string)
              : (tokens['--color-text-primary'] as string),
          },
        ]}
      >
        {label}
      </Txt>
    </Btn>
  );
}
