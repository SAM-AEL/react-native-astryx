import { useState } from 'react';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface CodeBlockProps extends BaseProps {
  /** The source code to display. */
  code: string;
  language?: string;
  /** Show a copy button using the system clipboard. */
  copyable?: boolean;
}

const styles = css.create({
  base: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '12px',
    display: 'flex',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  copy: { display: 'flex', paddingVertical: '2px' },
});

/** Multi-line code display with optional copy-to-clipboard. */
export function CodeBlock({
  code,
  language,
  copyable = true,
  xstyle,
  testID,
}: CodeBlockProps) {
  const tokens = useTokens();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    const Clipboard = require('react-native').Clipboard;
    if (Clipboard?.setString != null) {
      Clipboard.setString(code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <View
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
      {language != null || copyable ? (
        <View style={styles.header}>
          <Text size={11} color="tertiary">
            {language ?? ''}
          </Text>
          {copyable ? (
            <Btn
              onPress={copy}
              accessibilityLabel="Copy code"
              style={styles.copy}
            >
              <Text size={12} color="accent">
                {copied ? 'Copied' : 'Copy'}
              </Text>
            </Btn>
          ) : null}
        </View>
      ) : null}
      <Text mono={true} size={13} selectable={true}>
        {code}
      </Text>
    </View>
  );
}
