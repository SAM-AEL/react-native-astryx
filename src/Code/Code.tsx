import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';

export interface CodeProps extends BaseProps {
  children: string;
}

const styles = css.create({
  base: {
    backgroundColor: 'rgba(0,0,0,0.06)',
    borderRadius: '5px',
    paddingHorizontal: '6px',
    paddingVertical: '2px',
  },
});

/** Inline code snippet. */
export function Code({ children, xstyle, testID }: CodeProps) {
  const tokens = useTokens();

  return (
    <Text
      mono={true}
      size={13}
      xstyle={[
        styles.base,
        { color: tokens['--color-text-primary'] as string },
        xstyle,
      ]}
      testID={testID}
    >
      {children}
    </Text>
  );
}
