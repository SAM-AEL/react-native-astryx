import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, View } from '../internal/elements';

export interface SwitchProps extends BaseProps {
  /** Controlled checked state (upstream convention). */
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const styles = css.create({
  track: {
    width: '48px',
    height: '28px',
    borderRadius: '9999px',
    padding: '2px',
    display: 'flex',
  },
  thumb: {
    width: '24px',
    height: '24px',
    borderRadius: '9999px',
    backgroundColor: '#FFFFFF',
  },
});

/** A two-state toggle driven by a controlled `checked` prop. */
export function Switch({
  checked,
  onCheckedChange,
  disabled = false,
  xstyle,
  testID,
}: SwitchProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <Btn
      onPress={disabled ? undefined : () => onCheckedChange?.(!checked)}
      disabled={disabled}
      role="switch"
      accessibilityState={{ checked, disabled }}
      style={[
        styles.track,
        {
          backgroundColor: checked
            ? (tokens['--color-accent'] as string)
            : (tokens['--color-background-inset'] as string),
          justifyContent: checked ? 'flex-end' : 'flex-start',
          opacity: disabled ? 0.5 : 1,
        },
        getComponentOverride(theme, 'switch'),
        xstyle,
      ]}
      testID={testID}
    >
      <View style={[styles.thumb]} />
    </Btn>
  );
}
