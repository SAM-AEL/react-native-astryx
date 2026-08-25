import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface SideNavItem {
  label: string;
  value: string;
  onPress?: () => void;
}

export interface SideNavProps extends BaseProps {
  sections: ReadonlyArray<{
    heading?: string;
    items: readonly SideNavItem[];
  }>;
  /** Controlled selected item value. */
  value: string | null;
  onItemPress?: (item: SideNavItem) => void;
}

const styles = css.create({
  heading: {
    paddingHorizontal: '16px',
    paddingTop: '16px',
    paddingBottom: '4px',
  },
  item: {
    paddingVertical: '10px',
    paddingHorizontal: '16px',
    borderRadius: '8px',
    marginHorizontal: '8px',
    display: 'flex',
  },
});

/**
 * A sectioned navigation list. Drop it into a drawer or
 * `Layout.start` — on phones it is typically revealed behind a toggle.
 */
export function SideNav({
  sections,
  value,
  onItemPress,
  xstyle,
  testID,
}: SideNavProps) {
  const tokens = useTokens();

  return (
    <VStack gap={0} xstyle={xstyle} testID={testID}>
      {sections.map((section, i) => (
        <View key={i}>
          {section.heading != null ? (
            <View style={styles.heading}>
              <Text size={11} weight="semibold" color="tertiary">
                {section.heading.toUpperCase()}
              </Text>
            </View>
          ) : null}
          <VStack gap={1}>
            {section.items.map((item) => {
              const selected = item.value === value;
              return (
                <Btn
                  key={item.value}
                  onPress={() => onItemPress?.(item)}
                  accessibilityState={{ selected }}
                  style={[
                    styles.item,
                    selected
                      ? {
                          backgroundColor: tokens[
                            '--color-accent-muted'
                          ] as string,
                        }
                      : null,
                  ]}
                >
                  <Text
                    size={14}
                    color={selected ? 'accent' : 'primary'}
                    weight={selected ? 'semibold' : 'regular'}
                  >
                    {item.label}
                  </Text>
                </Btn>
              );
            })}
          </VStack>
        </View>
      ))}
    </VStack>
  );
}
