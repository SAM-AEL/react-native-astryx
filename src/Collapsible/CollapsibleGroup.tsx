import type { BaseProps } from '../BaseProps';
import { View } from '../internal/elements';
import { Divider } from '../Divider';
import { VStack } from '../VStack';
import { Collapsible, type CollapsibleProps } from '../Collapsible';

export interface CollapsibleGroupProps extends BaseProps {
  /** One entry per section; only `title` and `children` are honored. */
  sections: ReadonlyArray<Pick<CollapsibleProps, 'title' | 'children'>>;
}

/** A stack of collapsible sections with dividers. */
export function CollapsibleGroup({
  sections,
  xstyle,
  testID,
}: CollapsibleGroupProps) {
  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {sections.map((section, i) => (
        <View key={i}>
          <Collapsible title={section.title}>{section.children}</Collapsible>
          {i < sections.length - 1 ? <Divider /> : null}
        </View>
      ))}
    </VStack>
  );
}
