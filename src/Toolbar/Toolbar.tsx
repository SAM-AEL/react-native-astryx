import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';

export interface ToolbarProps extends BaseProps {
  children?: React.ReactNode;
}

const styles = css.create({
  base: {
    display: 'flex',
    paddingVertical: '6px',
    paddingHorizontal: '8px',
  },
});

/** A horizontal strip grouping related actions. */
export function Toolbar({ children, xstyle, testID }: ToolbarProps) {
  return (
    <HStack
      gap={1}
      align="center"
      xstyle={[styles.base, xstyle]}
      testID={testID}
    >
      {children}
    </HStack>
  );
}
