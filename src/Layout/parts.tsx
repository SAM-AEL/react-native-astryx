import type { BaseProps } from '../BaseProps';
import { View } from '../internal/elements';

/** Sticky top region of a `Layout`. */
export function LayoutHeader({
  children,
  xstyle,
  testID,
}: BaseProps & { children?: React.ReactNode }) {
  return (
    <View xstyle={xstyle} testID={testID}>
      {children}
    </View>
  );
}

/** Scrollable middle region of a `Layout`. */
export function LayoutContent({
  children,
  xstyle,
  testID,
}: BaseProps & { children?: React.ReactNode }) {
  return (
    <View xstyle={[{ flex: 1 }, xstyle]} testID={testID}>
      {children}
    </View>
  );
}

/** Sticky bottom region of a `Layout` (toolbars, safe-area actions). */
export function LayoutFooter({
  children,
  xstyle,
  testID,
}: BaseProps & { children?: React.ReactNode }) {
  return (
    <View xstyle={xstyle} testID={testID}>
      {children}
    </View>
  );
}

/** A themed side panel for use in `Layout.start`. */
export function LayoutPanel({
  children,
  xstyle,
  testID,
}: BaseProps & { children?: React.ReactNode }) {
  return (
    <View xstyle={xstyle} testID={testID}>
      {children}
    </View>
  );
}
