import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import {
  stackBaseStyles,
  stackLayoutStyle,
  type StackProps,
} from '../Stack/stackShared';
import { View } from '../internal/elements';

export type VStackProps = StackProps & BaseProps;

/** Vertical stack: children laid out in a column with a shared gap. */
export function VStack({ children, xstyle, testID, ...layout }: VStackProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <View
      style={[
        stackBaseStyles.base,
        { flexDirection: 'column' },
        stackLayoutStyle(tokens, layout),
        getComponentOverride(theme, 'vstack'),
        xstyle,
      ]}
      testID={testID}
    >
      {children}
    </View>
  );
}
