import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { VStack } from '../VStack';

export interface ListProps extends BaseProps {
  children?: React.ReactNode;
}

const styles = css.create({
  base: { display: 'flex' },
});

/** Edge-to-edge collection of `ListItem` rows with shared dividers. */
export function List({ children, xstyle, testID }: ListProps) {
  return (
    <VStack gap={0} xstyle={[styles.base, xstyle]} testID={testID}>
      {children}
    </VStack>
  );
}
