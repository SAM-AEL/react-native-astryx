import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { HStack } from '../HStack';
import { Btn, View } from '../internal/elements';

export interface CrumbItem {
  label: string;
  onPress?: () => void;
}

export interface BreadcrumbsProps extends BaseProps {
  /** Trail from root to current page; the last item is not interactive. */
  items: readonly CrumbItem[];
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '6px',
    flexWrap: 'wrap',
  },
});

/** Compact location trail for nested screens. */
export function Breadcrumbs({ items, xstyle, testID }: BreadcrumbsProps) {
  return (
    <HStack
      gap={1}
      align="center"
      xstyle={[styles.base, xstyle]}
      testID={testID}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <HStack key={index} gap={1} align="center">
            {isLast || item.onPress == null ? (
              <Text size={13} color={isLast ? 'primary' : 'secondary'}>
                {item.label}
              </Text>
            ) : (
              <Btn onPress={item.onPress}>
                <Text size={13} color="accent">
                  {item.label}
                </Text>
              </Btn>
            )}
            {!isLast ? (
              <View>
                <Text size={11} color="tertiary">
                  ›
                </Text>
              </View>
            ) : null}
          </HStack>
        );
      })}
    </HStack>
  );
}
