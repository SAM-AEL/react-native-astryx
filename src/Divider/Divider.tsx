import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export interface DividerProps extends BaseProps {
  /** Draw the line vertically (for HStack layouts). */
  vertical?: boolean;
  /** Inset the divider from the leading edge. */
  inset?: number;
}

const styles = css.create({
  horizontal: { minHeight: '1px', width: '100%' },
  vertical: { minWidth: '1px', alignSelf: 'stretch' },
});

/** A thin separator between rows or sections. */
export function Divider({
  vertical = false,
  inset = 0,
  xstyle,
  testID,
}: DividerProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <View
      style={[
        vertical ? styles.vertical : styles.horizontal,
        {
          backgroundColor: tokens['--color-border'] as string,
          marginStart: vertical ? inset : undefined,
          marginTop: vertical ? undefined : inset,
        },
        getComponentOverride(theme, 'divider'),
        xstyle,
      ]}
      testID={testID}
    />
  );
}
