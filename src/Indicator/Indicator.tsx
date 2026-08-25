import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface CheckboxIndicatorProps extends BaseProps {
  checked: boolean;
}

export interface RadioIndicatorProps extends BaseProps {
  selected: boolean;
}

const styles = css.create({
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
  ring: {
    width: '22px',
    height: '22px',
    borderRadius: '9999px',
    borderWidth: '2px',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  dot: { width: '10px', height: '10px', borderRadius: '9999px' },
});

/** The visual box of a checkbox, for building custom controls. */
export function CheckboxIndicator({
  checked,
  xstyle,
  testID,
}: CheckboxIndicatorProps) {
  const tokens = useTokens();
  const accent = tokens['--color-accent'] as string;

  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: checked ? accent : 'transparent',
          borderColor: checked
            ? accent
            : (tokens['--color-border-strong'] as string),
        },
        xstyle,
      ]}
      testID={testID}
    >
      {checked ? (
        <Text size={14} weight="bold" color="inverse">
          ✓
        </Text>
      ) : null}
    </View>
  );
}

/** The visual ring of a radio control. */
export function RadioIndicator({
  selected,
  xstyle,
  testID,
}: RadioIndicatorProps) {
  const tokens = useTokens();
  const accent = tokens['--color-accent'] as string;

  return (
    <View
      style={[
        styles.ring,
        {
          borderColor: selected
            ? accent
            : (tokens['--color-border-strong'] as string),
          backgroundColor: selected ? accent : 'transparent',
        },
        xstyle,
      ]}
      testID={testID}
    >
      {selected ? (
        <View style={[styles.dot, { backgroundColor: '#FFFFFF' }]} />
      ) : null}
    </View>
  );
}
