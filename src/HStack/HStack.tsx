import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { stackLayoutStyle, type StackProps } from '../Stack/stackShared';
import { View } from '../internal/elements';

const styles = css.create({
  base: { display: 'flex' },
});

export type HStackProps = StackProps & BaseProps;

/** Horizontal stack: children laid out in a row with a shared gap. */
export function HStack({ children, xstyle, testID, ...layout }: HStackProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <View
      style={[
        styles.base,
        { flexDirection: 'row' },
        stackLayoutStyle(tokens, layout),
        getComponentOverride(theme, 'hstack'),
        xstyle,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}
