import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { MobileNav, type MobileNavItem } from '../MobileNav';
import { View } from '../internal/elements';

export interface AppShellProps extends BaseProps {
  header?: React.ReactNode;
  content: React.ReactNode;
  /** Bottom tab bar definition (mobile app shell). */
  tabs?: readonly [MobileNavItem, ...MobileNavItem[]];
  activeTab?: string;
  onTabChange?: (value: string) => void;
}

const styles = css.create({
  root: { flex: 1, display: 'flex' },
  body: { flex: 1 },
});

/**
 * Opinionated mobile screen shell: optional header, scrollable-free
 * content region you control, and the bottom `MobileNav` bar.
 */
export function AppShell({
  header,
  content,
  tabs,
  activeTab,
  onTabChange,
  xstyle,
  testID,
}: AppShellProps) {
  return (
    <View xstyle={[styles.root, xstyle]} testID={testID}>
      {header}
      <View style={styles.body}>{content}</View>
      {tabs != null ? (
        <MobileNav
          items={tabs}
          value={activeTab ?? tabs[0].value}
          onChange={onTabChange}
        />
      ) : null}
    </View>
  );
}
