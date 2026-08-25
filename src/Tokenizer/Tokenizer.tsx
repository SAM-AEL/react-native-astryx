import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { HStack } from '../HStack';
import { Token } from '../Token';
import { useTokens } from '../theme';
import { Btn, Input, View } from '../internal/elements';

export interface TokenizerProps extends BaseProps {
  /** Controlled token values. */
  value: readonly string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  label?: string;
}

const styles = css.create({
  wrap: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '6px',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '4px',
    alignItems: 'center',
  },
});

/** A controlled multi-value input rendering each value as a `Token`. */
export function Tokenizer({
  value,
  onChange,
  placeholder = 'Add…',
  label,
  xstyle,
  testID,
}: TokenizerProps) {
  const tokens = useTokens();
  const [draft, setDraft] = useState('');

  const commit = () => {
    const v = draft.trim();
    if (v.length > 0 && !value.includes(v)) {
      onChange?.([...value, v]);
    }
    setDraft('');
  };

  return (
    <View>
      {label != null ? (
        <Text size={13} weight="medium">
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.wrap,
          {
            backgroundColor: tokens['--color-background-body'] as string,
            borderColor: tokens['--color-border'] as string,
          },
          xstyle,
        ]}
        testID={testID}
      >
        {value.map((v) => (
          <Token
            key={v}
            label={v}
            color="accent"
            onRemove={() => onChange?.(value.filter((x) => x !== v))}
          />
        ))}
        <Input
          value={draft}
          onChange={(e) => setDraft(e.nativeEvent.text ?? '')}
          onSubmitEditing={commit}
          placeholder={placeholder}
          style={{
            minWidth: 80,
            flex: 1,
            paddingVertical: '6px',
            paddingHorizontal: '4px',
            fontSize: '15px',
          }}
        />
      </View>
      {draft.trim().length > 0 ? (
        <HStack>
          <Btn onPress={commit}>
            <Text size={12} color="accent">
              Add “{draft.trim()}”
            </Text>
          </Btn>
        </HStack>
      ) : null}
    </View>
  );
}
