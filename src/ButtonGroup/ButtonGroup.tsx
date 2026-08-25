import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';

export interface ButtonGroupProps extends BaseProps {
  children?: React.ReactNode;
}

const styles = css.create({
  base: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    overflow: 'hidden',
    alignSelf: 'flex-start',
  },
});

/** Groups related buttons into a single connected control. */
export function ButtonGroup({ children, xstyle, testID }: ButtonGroupProps) {
  return (
    <HStack gap={0} xstyle={[styles.base, xstyle]} testID={testID}>
      {children}
    </HStack>
  );
}
