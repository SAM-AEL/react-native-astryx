import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { VStack } from '../VStack';

export interface StackProps extends BaseProps {
  children?: React.ReactNode;
  /** Layout axis; defaults to column like upstream `Stack`. */
  direction?: 'row' | 'column';
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  padding?: number | string;
  grow?: boolean;
}

/**
 * Direction-agnostic stack. Prefer `VStack`/`HStack` when the axis is
 * known; `Stack` adapts via the `direction` prop.
 */
export function Stack({ direction = 'column', ...props }: StackProps) {
  return direction === 'row' ? <HStack {...props} /> : <VStack {...props} />;
}
