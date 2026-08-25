import { Modal } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Heading } from '../Heading';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface BottomSheetProps extends BaseProps {
  /** Whether the sheet is shown. Controlled by the caller. */
  visible: boolean;
  onDismiss: () => void;
  title?: string;
  children?: React.ReactNode;
  /** Panel height as a fraction of the screen (0–1). */
  heightFraction?: number;
}

const styles = css.create({
  overlayWrap: { flex: 1, display: 'flex', justifyContent: 'flex-end' },
  backdrop: { flex: 1 },
  panel: {
    borderTopStartRadius: '16px',
    borderTopEndRadius: '16px',
    paddingHorizontal: '20px',
    paddingTop: '12px',
    paddingBottom: '32px',
    maxHeight: '90%',
    display: 'flex',
  },
  grabber: {
    alignSelf: 'center',
    width: '36px',
    height: '4px',
    borderRadius: '9999px',
    marginBottom: '12px',
  },
});

/** A modal panel sliding up from the bottom edge of the screen. */
export function BottomSheet({
  visible,
  onDismiss,
  title,
  children,
  heightFraction = 0.5,
  xstyle,
  testID,
}: BottomSheetProps) {
  const tokens = useTokens();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onDismiss}
      testID={testID}
    >
      <View style={styles.overlayWrap}>
        <Btn
          accessibilityLabel="Dismiss"
          onPress={onDismiss}
          style={[
            styles.backdrop,
            { backgroundColor: tokens['--color-overlay'] as string },
          ]}
        />
        <View
          style={[
            styles.panel,
            {
              height: `${Math.round(heightFraction * 100)}%`,
              backgroundColor: tokens['--color-background-body'] as string,
            },
            xstyle,
          ]}
        >
          <VStack gap={4}>
            <View
              style={[
                styles.grabber,
                { backgroundColor: tokens['--color-border-strong'] as string },
              ]}
            />
            {title != null ? <Heading level={4}>{title}</Heading> : null}
            <View>{children}</View>
          </VStack>
        </View>
      </View>
    </Modal>
  );
}
