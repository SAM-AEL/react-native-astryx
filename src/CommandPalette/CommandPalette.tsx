import { useState } from 'react';
import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Btn, Input, View } from '../internal/elements';

export interface CommandPaletteItem {
  label: string;
  value: string;
  /** Group heading shown above the item. */
  group?: string;
  onPress?: () => void;
}

export interface CommandPaletteProps extends BaseProps {
  items: readonly CommandPaletteItem[];
  visible: boolean;
  onDismiss: () => void;
  placeholder?: string;
}

const styles = css.create({
  sheetWrap: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  backdrop: { flex: 1 },
  panel: {
    borderTopStartRadius: '16px',
    borderTopEndRadius: '16px',
    padding: '12px',
    paddingBottom: '40px',
    maxHeight: '70%',
    display: 'flex',
  },
});

/**
 * A command/search palette presenting a filtered action list in a
 * bottom sheet — the touch-native equivalent of the ⌘K palette.
 */
export function CommandPalette({
  items,
  visible,
  onDismiss,
  placeholder = 'Type a command…',
  xstyle,
  testID,
}: CommandPaletteProps) {
  const tokens = useTokens();
  const [query, setQuery] = useState('');

  const matches = query.trim()
    ? items.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : items;

  let lastGroup: string | undefined;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <View style={styles.sheetWrap}>
        <Btn
          accessibilityLabel="Close"
          onPress={onDismiss}
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
          <VStack gap={2}>
            <Input
              value={query}
              onChange={(e) => setQuery(e.nativeEvent.text ?? '')}
              placeholder={placeholder}
              style={{
                borderRadius: '8px',
                borderWidth: '1px',
                borderStyle: 'solid',
                paddingHorizontal: '12px',
                paddingVertical: '10px',
                fontSize: '15px',
                backgroundColor: tokens['--color-background-surface'] as string,
                borderColor: tokens['--color-border'] as string,
                color: tokens['--color-text-primary'] as string,
              }}
            />
            <VStack gap={0}>
              {matches.map((item) => {
                const showGroup =
                  item.group != null && item.group !== lastGroup;
                lastGroup = item.group;
                return (
                  <View key={item.value}>
                    {showGroup ? (
                      <Text
                        size={11}
                        weight="semibold"
                        color="tertiary"
                        xstyle={{ paddingTop: 10 }}
                      >
                        {(item.group ?? '').toUpperCase()}
                      </Text>
                    ) : null}
                    <Btn
                      onPress={() => {
                        onDismiss();
                        item.onPress?.();
                      }}
                      style={{ paddingVertical: 12, paddingHorizontal: 8 }}
                    >
                      <Text>{item.label}</Text>
                    </Btn>
                  </View>
                );
              })}
              {matches.length === 0 ? (
                <Text
                  color="tertiary"
                  size={13}
                  xstyle={{ paddingVertical: 12 }}
                >
                  No matching commands.
                </Text>
              ) : null}
            </VStack>
          </VStack>
        </View>
      </View>
    </Modal>
  );
}
