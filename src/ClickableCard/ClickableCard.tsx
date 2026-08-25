import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { resolveSpacing } from '../Stack/stackShared';
import { css } from 'react-strict-dom';
import { Btn } from '../internal/elements';

export interface ClickableCardProps extends BaseProps {
  children?: React.ReactNode;
  padding?: number | string;
  /** Called when the card is tapped. */
  onPress?: () => void;
  disabled?: boolean;
}

const styles = css.create({
  base: {
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
});

/** A `Card` that responds to taps. */
export function ClickableCard({
  children,
  padding = 4,
  onPress,
  disabled = false,
  xstyle,
  testID,
}: ClickableCardProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <Btn
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={[
        styles.base,
        {
          backgroundColor: tokens['--color-background-surface'] as string,
          borderColor: tokens['--color-border'] as string,
          opacity: disabled ? 0.5 : 1,
          padding: resolveSpacing(tokens, padding),
        },
        getComponentOverride(theme, 'clickablecard'),
        xstyle,
      ]}
      testID={testID}
    >
      {children}
    </Btn>
  );
}
