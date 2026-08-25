import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text, type TextColor } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface TokenProps extends BaseProps {
  label: string;
  onRemove?: () => void;
  color?: 'neutral' | 'accent';
}

const styles = css.create({
  base: {
    borderRadius: '9999px',
    paddingStart: '10px',
    paddingEnd: '4px',
    paddingVertical: '3px',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '2px',
  },
  remove: {
    width: '20px',
    height: '20px',
    borderRadius: '9999px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

/** A small labeled chip, optionally removable — used by `Tokenizer`. */
export function Token({
  label,
  onRemove,
  color = 'neutral',
  xstyle,
  testID,
}: TokenProps) {
  const tokens = useTokens();

  const bg =
    color === 'accent'
      ? (tokens['--color-accent-muted'] as string)
      : (tokens['--color-background-inset'] as string);
  const fg: TextColor = color === 'accent' ? 'accent' : 'primary';

  return (
    <View
      style={[styles.base, { backgroundColor: bg }, xstyle]}
      testID={testID}
    >
      <Text size={13} color={fg}>
        {label}
      </Text>
      {onRemove != null ? (
        <Btn
          onPress={onRemove}
          accessibilityLabel={`Remove ${label}`}
          style={styles.remove}
        >
          <Text size={11} color="tertiary">
            ✕
          </Text>
        </Btn>
      ) : null}
    </View>
  );
}
