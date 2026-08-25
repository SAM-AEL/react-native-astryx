import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { FieldLabel } from '../Field';
import { Text } from '../Text';
import { HStack } from '../HStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface TimeInputProps extends BaseProps {
  /** Controlled time as "HH:mm" (24h), or null. */
  value: string | null;
  onChange?: (value: string) => void;
  label?: string;
}

const styles = css.create({
  field: {
    width: '56px',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingVertical: '10px',
    alignItems: 'center',
    display: 'flex',
  },
});

function clampPart(part: string): number {
  const n = Number.parseInt(part.replace(/\D/g, ''), 10);
  return Number.isFinite(n) ? Math.max(0, Math.min(99, n)) : 0;
}

/** A controlled hour/minute pair (24-hour). */
export function TimeInput({
  value,
  onChange,
  label,
  xstyle,
  testID,
}: TimeInputProps) {
  const tokens = useTokens();
  const [hh = '00', mm = '00'] = (value ?? '').split(':');

  const set = (h: string, m: string) => onChange?.(`${h}:${m}`);

  const bump = (part: 'h' | 'm', delta: number) => {
    if (part === 'h') {
      set(
        String((Number(hh) + delta + 24) % 24).padStart(2, '0'),
        mm.padStart(2, '0')
      );
    } else {
      set(
        hh.padStart(2, '0'),
        String((Number(mm) + delta + 60) % 60).padStart(2, '0')
      );
    }
  };

  return (
    <View>
      {label != null ? <FieldLabel>{label}</FieldLabel> : null}
      <HStack gap={1} align="center" xstyle={xstyle} testID={testID}>
        <Btn
          onPress={() => bump('h', -1)}
          accessibilityLabel="Hour down"
          style={[
            styles.field,
            { borderColor: tokens['--color-border'] as string },
          ]}
        >
          <Text>−</Text>
        </Btn>
        <View
          style={[
            styles.field,
            { borderColor: tokens['--color-border'] as string },
          ]}
        >
          <Text weight="medium">{String(clampPart(hh)).padStart(2, '0')}</Text>
        </View>
        <Btn
          onPress={() => bump('h', 1)}
          accessibilityLabel="Hour up"
          style={[
            styles.field,
            { borderColor: tokens['--color-border'] as string },
          ]}
        >
          <Text>＋</Text>
        </Btn>
        <Text color="tertiary">:</Text>
        <Btn
          onPress={() => bump('m', -1)}
          accessibilityLabel="Minute down"
          style={[
            styles.field,
            { borderColor: tokens['--color-border'] as string },
          ]}
        >
          <Text>−</Text>
        </Btn>
        <View
          style={[
            styles.field,
            { borderColor: tokens['--color-border'] as string },
          ]}
        >
          <Text weight="medium">{String(clampPart(mm)).padStart(2, '0')}</Text>
        </View>
        <Btn
          onPress={() => bump('m', 1)}
          accessibilityLabel="Minute up"
          style={[
            styles.field,
            { borderColor: tokens['--color-border'] as string },
          ]}
        >
          <Text>＋</Text>
        </Btn>
      </HStack>
    </View>
  );
}
