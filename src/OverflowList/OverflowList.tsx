import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { View } from '../internal/elements';

export interface OverflowListProps extends BaseProps {
  items: readonly React.ReactNode[];
  /** Max items rendered before collapsing into "+N". */
  max?: number;
}

const styles = css.create({
  more: {
    paddingHorizontal: '6px',
    display: 'flex',
  },
});

/**
 * Renders the first `max` items inline, then a "+N" indicator for the
 * remainder. (Measurement-driven overflow is not reliable on native;
 * use `max` to control the cutoff.)
 */
export function OverflowList({
  items,
  max = 3,
  xstyle,
  testID,
}: OverflowListProps) {
  const visible = items.slice(0, max);
  const rest = items.length - visible.length;

  return (
    <HStack gap={1} align="center" xstyle={xstyle} testID={testID}>
      {visible.map((item, i) => (
        <View key={i}>{item}</View>
      ))}
      {rest > 0 ? (
        <Text size={12} color="tertiary" xstyle={styles.more}>
          +{rest}
        </Text>
      ) : null}
    </HStack>
  );
}
