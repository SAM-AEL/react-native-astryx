import { useState } from 'react';
import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface DropdownMenuItem {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Shows a leading glyph. */
  icon?: string;
  destructive?: boolean;
}

export interface DropdownMenuProps extends BaseProps {
  items: readonly DropdownMenuItem[];
  children: (open: () => void) => React.ReactNode;
}

const styles = css.create({
  sheetWrap: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  backdrop: { flex: 1 },
  panel: {
    borderTopStartRadius: '16px',
    borderTopEndRadius: '16px',
    paddingVertical: '8px',
    paddingBottom: '40px',
    display: 'flex',
  },
  item: {
    paddingVertical: '14px',
    paddingHorizontal: '16px',
    display: 'flex',
  },
});

/**
 * A menu of actions opened by a render-prop trigger. Native adaptation:
 * presents as a bottom action sheet.
 */
export function DropdownMenu({
  items,
  children,
  xstyle,
  testID,
}: DropdownMenuProps) {
  const tokens = useTokens();
  const [open, setOpen] = useState(false);
  const openMenu = () => setOpen(true);

  return (
    <View>
      {children(openMenu)}
      <Modal
        animationType="slide"
        transparent={true}
        visible={open}
        onRequestClose={() => setOpen(false)}
        testID={testID}
      >
        <View style={styles.sheetWrap}>
          <Btn
            accessibilityLabel="Close menu"
            onPress={() => setOpen(false)}
            style={[
              styles.backdrop,
              { backgroundColor: tokens['--color-overlay'] as string },
            ]}
          />
          <View
            style={[
              styles.panel,
              { backgroundColor: tokens['--color-background-body'] as string },
              xstyle,
            ]}
          >
            <VStack gap={0}>
              {items.map((item, i) => (
                <Btn
                  key={i}
                  disabled={item.disabled}
                  onPress={() => {
                    setOpen(false);
                    item.onPress?.();
                  }}
                  style={styles.item}
                >
                  <Text
                    color={item.destructive ? 'critical' : 'primary'}
                    size={15}
                  >
                    {item.icon != null ? `${item.icon}  ` : ''}
                    {item.label}
                  </Text>
                </Btn>
              ))}
            </VStack>
          </View>
        </View>
      </Modal>
    </View>
  );
}
