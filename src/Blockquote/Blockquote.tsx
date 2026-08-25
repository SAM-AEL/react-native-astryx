import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { HStack } from '../HStack';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface BlockquoteProps extends BaseProps {
  children?: React.ReactNode;
  /** Optional attribution line under the quote. */
  cite?: string;
}

const styles = css.create({
  base: {
    borderStartWidth: '3px',
    borderStartStyle: 'solid',
    paddingLeft: '12px',
    paddingVertical: '2px',
    display: 'flex',
  },
});

/** An indented quotation with a leading rule. */
export function Blockquote({
  children,
  cite,
  xstyle,
  testID,
}: BlockquoteProps) {
  const tokens = useTokens();

  return (
    <View
      style={[
        styles.base,
        { borderStartColor: tokens['--color-border-strong'] as string },
        xstyle,
      ]}
      testID={testID}
    >
      <Text color="secondary">{children}</Text>
      {cite != null ? (
        <HStack>
          <Text size={13} color="tertiary">
            — {cite}
          </Text>
        </HStack>
      ) : null}
    </View>
  );
}
