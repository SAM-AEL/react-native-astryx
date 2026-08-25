import { useState } from 'react';
import { Pressable } from 'react-native';
import type { BaseProps } from '../BaseProps';
import { Card } from '../Card';
import { Popover } from '../Popover';
import { View } from '../internal/elements';

export interface HoverCardProps extends BaseProps {
  /** Card content shown while the trigger is long-pressed. */
  content: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Touch adaptation of the hover card: the preview appears while the
 * trigger is long-pressed; tap the backdrop to dismiss.
 */
export function HoverCard({
  content,
  children,
  xstyle,
  testID,
}: HoverCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <View>
      <Pressable onLongPress={() => setOpen(true)} delayLongPress={350}>
        {children}
      </Pressable>
      <Popover
        visible={open}
        onDismiss={() => setOpen(false)}
        xstyle={xstyle}
        testID={testID}
      >
        <Card padding={3}>{content}</Card>
      </Popover>
    </View>
  );
}
