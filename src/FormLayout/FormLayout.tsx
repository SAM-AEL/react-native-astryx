import type { BaseProps } from '../BaseProps';
import { VStack } from '../VStack';

export interface FormLayoutProps extends BaseProps {
  children?: React.ReactNode;
  /** Vertical rhythm between fields (token number). */
  gap?: number;
}

/** Standard vertical form scaffolding with consistent field spacing. */
export function FormLayout({
  children,
  gap = 4,
  xstyle,
  testID,
}: FormLayoutProps) {
  return (
    <VStack gap={gap} xstyle={xstyle} testID={testID}>
      {children}
    </VStack>
  );
}
