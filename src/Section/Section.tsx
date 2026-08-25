import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Heading } from '../Heading';
import { VStack } from '../VStack';

export interface SectionProps extends BaseProps {
  title?: string;
  children?: React.ReactNode;
}

const styles = css.create({
  base: { display: 'flex' },
});

/** A titled content region with consistent vertical rhythm. */
export function Section({ title, children, xstyle, testID }: SectionProps) {
  return (
    <VStack gap={2} xstyle={[styles.base, xstyle]} testID={testID}>
      {title != null ? <Heading level={4}>{title}</Heading> : null}
      {children}
    </VStack>
  );
}
