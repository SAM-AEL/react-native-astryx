import type { BaseProps } from '../BaseProps';
import { DropdownMenu, type DropdownMenuItem } from '../DropdownMenu';
import { IconButton } from '../IconButton';

export interface MoreMenuProps extends BaseProps {
  items: readonly DropdownMenuItem[];
}

/** The standard "⋯" overflow menu built on DropdownMenu. */
export function MoreMenu({ items, xstyle, testID }: MoreMenuProps) {
  return (
    <DropdownMenu items={items} xstyle={xstyle} testID={testID}>
      {(open) => (
        <IconButton icon="⋯" accessibilityLabel="More actions" onPress={open} />
      )}
    </DropdownMenu>
  );
}
