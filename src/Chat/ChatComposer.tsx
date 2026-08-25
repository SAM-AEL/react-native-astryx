import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Button } from '../Button';
import { HStack } from '../HStack';
import { useTokens } from '../theme';
import { Input, View } from '../internal/elements';

export interface ChatComposerProps extends BaseProps {
  /** Controlled draft text. */
  value: string;
  onChange: (value: string) => void;
  onSend?: () => void;
  placeholder?: string;
  sendLabel?: string;
  disabled?: boolean;
}

const styles = css.create({
  base: {
    display: 'flex',
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    padding: '10px',
  },
});

/** The message input row with a send action. */
export function ChatComposer({
  value,
  onChange,
  onSend,
  placeholder = 'Message…',
  sendLabel = 'Send',
  disabled = false,
  xstyle,
  testID,
}: ChatComposerProps) {
  const tokens = useTokens();
  const canSend = !disabled && value.trim().length > 0;

  return (
    <View
      style={[
        styles.base,
        { borderTopColor: tokens['--color-border'] as string },
        xstyle,
      ]}
      testID={testID}
    >
      <HStack gap={2} align="end">
        <View style={{ flex: 1, display: 'flex' }}>
          <Input
            value={value}
            multiline={true}
            onChange={(e) => onChange(e.nativeEvent.text ?? '')}
            onSubmitEditing={canSend ? onSend : undefined}
            placeholder={placeholder}
            editable={!disabled}
            style={{
              borderRadius: '18px',
              borderWidth: '1px',
              borderStyle: 'solid',
              paddingHorizontal: '14px',
              paddingVertical: '9px',
              fontSize: '15px',
              backgroundColor: tokens['--color-background-surface'] as string,
              borderColor: tokens['--color-border'] as string,
              color: tokens['--color-text-primary'] as string,
            }}
          />
        </View>
        <Button
          label={sendLabel}
          size="sm"
          variant={canSend ? 'primary' : 'secondary'}
          disabled={!canSend}
          onPress={onSend}
        />
      </HStack>
    </View>
  );
}

/** Vertical list container for `ChatMessage` rows. */
export function ChatMessageList({
  children,
  xstyle,
  testID,
}: BaseProps & { children?: React.ReactNode }) {
  return (
    <View xstyle={[{ flex: 1 }, xstyle]} testID={testID}>
      {children}
    </View>
  );
}
