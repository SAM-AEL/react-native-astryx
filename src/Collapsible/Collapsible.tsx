import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { Btn } from '../internal/elements';

export interface CollapsibleRenderProps {
  open: boolean;
  toggle: () => void;
}

export interface CollapsibleProps extends BaseProps {
  /** Header content; defaults to a built-in disclosure row. */
  title?: string;
  /** Controlled open state; omit to use internal state. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}

const styles = css.create({
  header: {
    display: 'flex',
    paddingVertical: '10px',
  },
});

/** A disclosure region. Controlled or uncontrolled. */
export function Collapsible({
  title,
  open: controlled,
  onOpenChange,
  defaultOpen = false,
  children,
  xstyle,
  testID,
}: CollapsibleProps) {
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const open = controlled ?? uncontrolled;
  const toggle = () => {
    onOpenChange?.(!open);
    if (controlled == null) {
      setUncontrolled(!open);
    }
  };

  return (
    <VStack gap={1} xstyle={xstyle} testID={testID}>
      {title != null ? (
        <Btn
          onPress={toggle}
          accessibilityState={{ expanded: open }}
          style={styles.header}
        >
          <HStack gap={2} align="center">
            <Text color="tertiary">{open ? '▾' : '›'}</Text>
            <Text weight="medium">{title}</Text>
          </HStack>
        </Btn>
      ) : null}
      {open ? children : null}
    </VStack>
  );
}

/** Convenience hook for custom collapsible headers. */
export function useCollapsible(defaultOpen = false) {
  const [open, setOpen] = useState(defaultOpen);
  return {
    open,
    setOpen,
    toggle: () => setOpen((o) => !o),
  };
}
