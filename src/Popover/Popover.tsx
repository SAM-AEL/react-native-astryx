import { Modal, Pressable } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface PopoverProps extends BaseProps {
  visible: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
}

const styles = css.create({
  backdrop: { flex: 1 },
  card: {
    borderRadius: '12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '14px',
    maxWidth: '320px',
    display: 'flex',
  },
});

/**
 * A small floating card over a dimmed backdrop. Native anchoring to a
 * trigger is platform work; compose with your own positioning if you
 * need arrow-accurate placement.
 */
export function Popover({
  visible,
  onDismiss,
  children,
  xstyle,
  testID,
}: PopoverProps) {
  const tokens = useTokens();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <Pressable style={styles.backdrop as never} onPress={onDismiss}>
        <View
          style={[
            styles.card,
            {
              backgroundColor: tokens['--color-background-body'] as string,
              borderColor: tokens['--color-border'] as string,
              // Elevation lives outside css.create: RN-only properties.
              shadowColor: '#000000',
              shadowOpacity: 0.15,
              shadowRadius: 16,
              shadowOffset: { width: 0, height: 6 },
              elevation: 8,
            },
            xstyle,
          ]}
        >
          <Pressable>{children}</Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
