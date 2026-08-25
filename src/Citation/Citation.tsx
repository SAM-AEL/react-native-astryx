import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { HStack } from '../HStack';
import { Avatar, type AvatarProps } from '../Avatar';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface CitationProps extends BaseProps {
  /** The quoted source text. */
  children?: React.ReactNode;
  author?: string;
  authorAvatar?: AvatarProps['src'];
  /** Where the quote came from (publication, talk, …). */
  source?: string;
}

const styles = css.create({
  base: {
    borderRadius: '10px',
    padding: '14px',
    display: 'flex',
  },
});

/** An attributed quotation block with author metadata. */
export function Citation({
  children,
  author,
  authorAvatar,
  source,
  xstyle,
  testID,
}: CitationProps) {
  const tokens = useTokens();

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: tokens['--color-background-surface'] as string },
        xstyle,
      ]}
      testID={testID}
    >
      <Text>{children}</Text>
      {author != null ? (
        <HStack gap={2} align="center">
          {authorAvatar != null ? (
            <Avatar src={authorAvatar} size="xs" />
          ) : null}
          <Text size={13} weight="medium">
            {author}
            {source != null ? (
              <Text size={13} color="tertiary">
                {' '}
                · {source}
              </Text>
            ) : null}
          </Text>
        </HStack>
      ) : null}
    </View>
  );
}
