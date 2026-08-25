import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { css } from 'react-strict-dom';
import { Txt } from '../internal/elements';

export interface KbdProps extends BaseProps {
  children: string;
}

const styles = css.create({
  base: {
    borderRadius: '5px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingHorizontal: '5px',
    paddingVertical: '1px',
  },
});

/** A keyboard key hint. On touch devices it renders as styled text. */
export function Kbd({ children, xstyle, testID }: KbdProps) {
  const tokens = useTokens();

  return (
    <Txt
      style={[
        styles.base,
        {
          backgroundColor: tokens['--color-background-inset'] as string,
          borderColor: tokens['--color-border'] as string,
        },
        xstyle,
      ]}
      testID={testID}
    >
      <Text size={12} color="secondary" mono>
        {children}
      </Text>
    </Txt>
  );
}
