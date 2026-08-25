import type { DropdownMenuItem } from '../DropdownMenu';
import type { BaseProps } from '../BaseProps';
import { DropdownMenu } from '../DropdownMenu';

export interface ContextMenuProps extends BaseProps {
  items: readonly DropdownMenuItem[];
  children: (open: () => void) => React.ReactNode;
}

/**
 * A long-press context menu. Native adaptation of the right-click
 * pattern: the trigger renders via render-prop; wrap it in your own
 * `Pressable` with `onLongPress` if you need custom gesture handling.
 */
export function ContextMenu({
  items,
  children,
  xstyle,
  testID,
}: ContextMenuProps) {
  return (
    <DropdownMenu items={items} xstyle={xstyle} testID={testID}>
      {children}
    </DropdownMenu>
  );
}
