import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface TooltipProps extends BaseProps {
  /** The tooltip text, revealed while pressed. */
  label: string;
  children: React.ReactNode;
}

const styles = css.create({
  tip: {
    borderRadius: '8px',
    paddingHorizontal: '10px',
    paddingVertical: '6px',
    marginTop: '6px',
    alignSelf: 'flex-start',
    display: 'flex',
  },
});

/**
 * Touch adaptation of the hover tooltip: the label shows while the
 * user presses and holds the trigger.
 */
export function Tooltip({ label, children, xstyle, testID }: TooltipProps) {
  const tokens = useTokens();
  const [pressed, setPressed] = useState(false);

  return (
    <View
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      xstyle={xstyle}
      testID={testID}
    >
      {children}
      {pressed ? (
        <View
          style={[
            styles.tip,
            { backgroundColor: tokens['--color-background-inverse'] as string },
          ]}
        >
          <Text size={12} color="inverse">
            {label}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
