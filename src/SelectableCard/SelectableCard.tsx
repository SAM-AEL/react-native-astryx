import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { resolveSpacing } from '../Stack/stackShared';
import { css } from 'react-strict-dom';
import { Btn } from '../internal/elements';

export interface SelectableCardProps extends BaseProps {
  children?: React.ReactNode;
  padding?: number | string;
  /** Whether the card is currently selected. */
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const styles = css.create({
  base: {
    borderRadius: '12px',
    borderWidth: '2px',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
});

/** A `Card` with a selected visual state, for single/multi pickers. */
export function SelectableCard({
  children,
  padding = 4,
  selected = false,
  onPress,
  disabled = false,
  xstyle,
  testID,
}: SelectableCardProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  const accent = selected ? (tokens['--color-accent'] as string) : undefined;

  return (
    <Btn
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityState={{ selected }}
      role="radio"
      style={[
        styles.base,
        {
          backgroundColor: selected
            ? (tokens['--color-accent-muted'] as string)
            : (tokens['--color-background-surface'] as string),
          borderColor: accent ?? (tokens['--color-border'] as string),
          opacity: disabled ? 0.5 : 1,
          padding: resolveSpacing(tokens, padding),
        },
        getComponentOverride(theme, 'selectablecard'),
        xstyle,
      ]}
      testID={testID}
    >
      {children}
    </Btn>
  );
}
