import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { Btn, View } from '../internal/elements';

export interface TreeNode {
  label: string;
  value: string;
  children?: readonly TreeNode[];
}

export interface TreeListProps extends BaseProps {
  nodes: readonly TreeNode[];
  /** Controlled selected node value. */
  value: string | null;
  onChange?: (value: string) => void;
}

const styles = css.create({
  row: {
    paddingVertical: '8px',
    paddingHorizontal: '4px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
  },
});

/** An expandable/collapsible hierarchy list with single selection. */
export function TreeList({
  nodes,
  value,
  onChange,
  xstyle,
  testID,
}: TreeListProps) {
  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {nodes.map((node) => (
        <TreeItem
          key={node.value}
          node={node}
          depth={0}
          value={value}
          onChange={onChange}
        />
      ))}
    </VStack>
  );
}

function TreeItem({
  node,
  depth,
  value,
  onChange,
}: {
  node: TreeNode;
  depth: number;
  value: string | null;
  onChange?: (v: string) => void;
}) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = node.children != null && node.children.length > 0;

  return (
    <View>
      <Btn
        onPress={() =>
          hasChildren ? setExpanded((e) => !e) : onChange?.(node.value)
        }
        accessibilityState={{
          expanded: hasChildren ? expanded : undefined,
          selected: value === node.value,
        }}
        style={[styles.row, { paddingStart: `${depth * 16}px` }]}
      >
        <Text size={12} color="tertiary">
          {hasChildren ? (expanded ? '▾' : '›') : '·'}
        </Text>
        <Text weight={value === node.value ? 'semibold' : 'regular'}>
          {node.label}
        </Text>
      </Btn>
      {expanded && hasChildren
        ? node.children?.map((child) => (
            <TreeItem
              key={child.value}
              node={child}
              depth={depth + 1}
              value={value}
              onChange={onChange}
            />
          ))
        : null}
    </View>
  );
}
