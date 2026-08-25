import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Divider } from '../Divider';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { View } from '../internal/elements';

export interface MetadataListItem {
  label: string;
  value: React.ReactNode;
}

export interface MetadataListProps extends BaseProps {
  items: readonly MetadataListItem[];
}

const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '8px',
    columnGap: '12px',
  },
});

/** A key–value list for entity details and summaries. */
export function MetadataList({ items, xstyle, testID }: MetadataListProps) {
  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {items.map((item, i) => (
        <View key={i}>
          <View style={styles.row}>
            <Text size={13} color="secondary">
              {item.label}
            </Text>
            <Text size={13} weight="medium">
              {item.value}
            </Text>
          </View>
          {i < items.length - 1 ? <Divider /> : null}
        </View>
      ))}
    </VStack>
  );
}
