import type { BaseProps } from '../BaseProps';
import { Button } from '../Button';
import { Dialog } from '../Dialog';
import { VStack } from '../VStack';
import { Text } from '../Text';

export interface AlertDialogProps extends BaseProps {
  visible: boolean;
  onDismiss: () => void;
  title: string;
  /** Explanatory body copy. */
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Confirm is destructive by default. */
  destructive?: boolean;
  onConfirm?: () => void;
}

/**
 * A confirmation dialog that cannot be dismissed by tapping outside —
 * the user must choose an action. Native `Modal` keeps back-button
 * behavior explicit.
 */
export function AlertDialog({
  visible,
  onDismiss,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive = false,
  onConfirm,
  xstyle,
  testID,
}: AlertDialogProps) {
  return (
    <Dialog
      visible={visible}
      onDismiss={onDismiss}
      title={title}
      xstyle={xstyle}
      testID={testID}
      footer={
        <>
          <Button label={cancelLabel} variant="ghost" onPress={onDismiss} />
          <Button
            label={confirmLabel}
            variant={destructive ? 'destructive' : 'primary'}
            onPress={() => {
              onConfirm?.();
              onDismiss();
            }}
          />
        </>
      }
    >
      {description != null ? (
        <VStack gap={2}>
          <Text color="secondary">{description}</Text>
        </VStack>
      ) : null}
    </Dialog>
  );
}
