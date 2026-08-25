import { Modal, Pressable } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { useTokens } from '../theme';

export interface OverlayProps extends BaseProps {
  visible: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
}

const styles = css.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
});

/** A dimmed full-screen layer anchoring custom floating content. */
export function Overlay({
  visible,
  onDismiss,
  children,
  xstyle,
  testID,
}: OverlayProps) {
  const tokens = useTokens();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <Pressable
        style={
          [
            styles.backdrop,
            { backgroundColor: tokens['--color-overlay'] as string },
            xstyle,
          ] as never
        }
        onPress={onDismiss}
      >
        <Pressable style={{ width: '100%', maxWidth: 480 } as never}>
          {children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
