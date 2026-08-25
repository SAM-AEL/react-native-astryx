import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { Btn } from '../internal/elements';

export interface NavMenuEntry {
  label: string;
  onPress?: () => void;
}

export interface NavMenuProps extends BaseProps {
  entries: readonly NavMenuEntry[];
  title?: string;
}

const styles = css.create({
  row: { paddingVertical: '10px', paddingHorizontal: '8px', display: 'flex' },
});
/** A generic vertical menu of tappable entries. */
export function NavMenu({ entries, title, xstyle, testID }: NavMenuProps) {
  return (
    <VStack gap={1} xstyle={xstyle} testID={testID}>
      {title != null ? <Text weight="semibold">{title}</Text> : null}
      {entries.map((entry, i) => (
        <Btn key={i} onPress={entry.onPress} style={[styles.row]}>
          <Text size={14}>{entry.label}</Text>
        </Btn>
      ))}
    </VStack>
  );
}
