import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { resolveSpacing } from '../Stack/stackShared';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export interface CardProps extends BaseProps {
  children?: React.ReactNode;
  /** Card padding; numbers reference spacing tokens. */
  padding?: number | string;
  /** Prominent surface treatment. */
  elevated?: boolean;
}

const styles = css.create({
  base: {
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
});

/**
 * A grouped surface for widgets, galleries, and settings groups.
 * Dense data belongs in rows (`List`), not cards.
 */
export function Card({
  children,
  padding = 4,
  elevated = false,
  xstyle,
  testID,
}: CardProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: tokens['--color-background-surface'] as string,
          borderColor: tokens['--color-border'] as string,
          padding: resolveSpacing(
            tokens,
            typeof padding === 'number' ? padding : padding
          ),
          shadowColor: '#000000',
          shadowOpacity: elevated ? 0.08 : 0,
          shadowRadius: elevated ? 12 : 0,
          shadowOffset: { width: 0, height: elevated ? 4 : 0 },
          elevation: elevated ? 3 : 0,
        },
        getComponentOverride(theme, 'card'),
        xstyle,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}
