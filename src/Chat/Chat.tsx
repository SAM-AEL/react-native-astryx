import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { Timestamp } from '../Timestamp';
import { Avatar } from '../Avatar';
import { HStack } from '../HStack';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

/* ---------------------------------- types --------------------------------- */

export interface ChatUser {
  name: string;
  avatar?: string;
}

export interface ChatMessageProps extends BaseProps {
  /** Author of the message. */
  author?: ChatUser;
  body: React.ReactNode;
  /** Render as an outgoing ("me") bubble. */
  outgoing?: boolean;
  createdAt?: Date | number;
}

export interface ChatSystemMessageProps extends BaseProps {
  children: React.ReactNode;
}

export interface ChatComposerProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  placeholder?: string;
  sendLabel?: string;
  disabled?: boolean;
}

/* --------------------------------- styles --------------------------------- */

const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    paddingVertical: '4px',
    paddingHorizontal: '12px',
  },
  rowOutgoing: {
    flexDirection: 'row-reverse',
  },
  bubble: {
    borderRadius: '18px',
    paddingHorizontal: '12px',
    paddingVertical: '8px',
    maxWidth: '80%',
    display: 'flex',
  },
  incoming: { borderBottomStartRadius: '6px' },
  outgoing: { borderBottomEndRadius: '6px' },
  systemWrap: {
    alignItems: 'center',
    paddingVertical: '6px',
    display: 'flex',
  },
});

/* ------------------------------- components ------------------------------- */

/** One message row with author bubble and optional timestamp. */
export function ChatMessage({
  author,
  body,
  outgoing = false,
  createdAt,
  xstyle,
  testID,
}: ChatMessageProps) {
  const tokens = useTokens();

  return (
    <View
      style={[styles.row, outgoing ? styles.rowOutgoing : null, xstyle]}
      testID={testID}
    >
      {!outgoing && author != null ? (
        <Avatar initials={author.name} size="sm" />
      ) : null}
      <View style={{ display: 'flex', maxWidth: '80%' }}>
        {!outgoing && author?.name != null ? (
          <Text size={11} color="tertiary">
            {author.name}
          </Text>
        ) : null}
        <View
          style={[
            styles.bubble,
            outgoing ? styles.outgoing : styles.incoming,
            {
              backgroundColor: outgoing
                ? (tokens['--color-accent'] as string)
                : (tokens['--color-background-surface'] as string),
            },
          ]}
        >
          <Text color={outgoing ? 'inverse' : 'primary'}>{body}</Text>
        </View>
        {createdAt != null ? (
          <HStack gap={1} justify={outgoing ? 'end' : 'start'}>
            <Timestamp date={createdAt} color="tertiary" />
          </HStack>
        ) : null}
      </View>
    </View>
  );
}

/** Centered low-emphasis line for join/leave/error events. */
export function ChatSystemMessage({
  children,
  xstyle,
  testID,
}: ChatSystemMessageProps) {
  return (
    <View style={[styles.systemWrap, xstyle]} testID={testID}>
      <Text size={12} color="tertiary">
        {children}
      </Text>
    </View>
  );
}
