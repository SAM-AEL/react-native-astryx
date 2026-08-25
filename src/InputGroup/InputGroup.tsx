import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { View } from '../internal/elements';
import { useTokens } from '../theme';

export interface InputGroupProps extends BaseProps {
  children?: React.ReactNode;
  /** Static prefix (e.g. "https://"). */
  startText?: string;
  /** Static suffix (e.g. ".com" or a unit). */
  endText?: string;
}

const styles = css.create({
  base: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    overflow: 'hidden',
  },
  adornment: {
    paddingHorizontal: '10px',
    paddingVertical: '10px',
    display: 'flex',
  },
});

/** Groups an input with static prefix/suffix text in one bordered field. */
export function InputGroup({
  children,
  startText,
  endText,
  xstyle,
  testID,
}: InputGroupProps) {
  const tokens = useTokens();
  const borderColor = tokens['--color-border'] as string;

  return (
    <HStack
      gap={0}
      align="center"
      xstyle={[styles.base, { borderColor }, xstyle]}
      testID={testID}
    >
      {startText != null ? (
        <View style={styles.adornment}>
          <Text color="tertiary">{startText}</Text>
        </View>
      ) : null}
      <View style={{ flex: 1, display: 'flex' }}>{children}</View>
      {endText != null ? (
        <View style={styles.adornment}>
          <Text color="tertiary">{endText}</Text>
        </View>
      ) : null}
    </HStack>
  );
}
