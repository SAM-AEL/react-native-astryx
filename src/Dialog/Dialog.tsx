import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Heading } from '../Heading';
import { HStack } from '../HStack';
import { IconButton } from '../IconButton';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface DialogProps extends BaseProps {
  /** Whether the dialog is shown. Controlled by the caller. */
  visible: boolean;
  /** Called when the overlay or close button dismisses the dialog. */
  onDismiss: () => void;
  title?: string;
  children?: React.ReactNode;
  /** Right-aligned actions row (usually Buttons). */
  footer?: React.ReactNode;
}

const styles = css.create({
  overlay: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  panel: {
    width: '100%',
    maxWidth: '480px',
    borderRadius: '16px',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '20px',
    maxHeight: '80%',
  },
});

/**
 * A modal dialog. Native implementation uses the platform `Modal`,
 * keeping focus and back-button behavior correct.
 */
export function Dialog({
  visible,
  onDismiss,
  title,
  children,
  footer,
  xstyle,
  testID,
}: DialogProps) {
  const tokens = useTokens();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <View
        style={[
          styles.overlay,
          { backgroundColor: tokens['--color-overlay'] as string },
        ]}
      >
        <View
          style={[
            styles.panel,
            {
              backgroundColor: tokens['--color-background-body'] as string,
              borderColor: tokens['--color-border'] as string,
            },
            xstyle,
          ]}
        >
          <VStack gap={4}>
            {title != null ? (
              <HStack gap={2} align="center" justify="end">
                <Heading level={4}>{title}</Heading>
                <IconButton
                  icon="✕"
                  accessibilityLabel="Close"
                  size="sm"
                  onPress={onDismiss}
                />
              </HStack>
            ) : null}
            <View>{children}</View>
            {footer != null ? (
              <HStack gap={2} justify="end">
                {footer}
              </HStack>
            ) : null}
          </VStack>
        </View>
      </View>
    </Modal>
  );
}
