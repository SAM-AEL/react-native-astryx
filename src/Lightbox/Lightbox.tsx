import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { IconButton } from '../IconButton';
import { Img, View } from '../internal/elements';

export interface LightboxProps extends BaseProps {
  visible: boolean;
  onDismiss: () => void;
  src: string;
  /** Accessible description of the image. */
  alt?: string;
}

const styles = css.create({
  root: { flex: 1 },
});

/** Full-screen image viewer with a dismiss control. */
export function Lightbox({
  visible,
  onDismiss,
  src,
  alt = '',
  xstyle,
  testID,
}: LightboxProps) {
  return (
    <Modal
      animationType="fade"
      transparent={false}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <View xstyle={[styles.root, { backgroundColor: '#000000' }, xstyle]}>
        <Img src={src} accessibilityLabel={alt} style={{ flex: 1 }} />
        <View style={{ position: 'absolute', top: 48, end: 16 }}>
          <IconButton
            icon="✕"
            accessibilityLabel="Close"
            variant="secondary"
            onPress={onDismiss}
          />
        </View>
      </View>
    </Modal>
  );
}
