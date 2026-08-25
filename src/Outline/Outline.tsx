import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { Btn } from '../internal/elements';

export interface OutlineItem {
  label: string;
  onPress?: () => void;
  /** Nesting depth (0-based). */
  depth?: number;
}

export interface OutlineProps extends BaseProps {
  items: readonly OutlineItem[];
}

const styles = css.create({
  item: {
    paddingVertical: '6px',
    paddingHorizontal: '8px',
    alignItems: 'flex-start',
    display: 'flex',
  },
});

/** A nested table-of-contents for long screens. */
export function Outline({ items, xstyle, testID }: OutlineProps) {
  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {items.map((item, i) => (
        <Btn
          key={i}
          onPress={item.onPress}
          style={[
            styles.item,
            { paddingStart: `${8 + (item.depth ?? 0) * 16}px` },
          ]}
        >
          <Text size={13} color="secondary">
            {item.label}
          </Text>
        </Btn>
      ))}
    </VStack>
  );
}
