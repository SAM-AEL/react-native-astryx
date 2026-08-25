import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { FieldLabel } from '../Field';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { HStack } from '../HStack';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface PickedFile {
  name: string;
  size?: number;
}

export interface FileInputProps extends BaseProps {
  /** Controlled picked files. */
  value: readonly PickedFile[];
  onChange?: (files: PickedFile[]) => void;
  label?: string;
  placeholder?: string;
  multiple?: boolean;
  /**
   * Native file picking is app-level: wire this to your picker of
   * choice (e.g. expo-document-picker) and hand results back via
   * `onChange`.
   */
  onPickRequest?: () => void;
}

const styles = css.create({
  trigger: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingVertical: '12px',
    alignItems: 'center',
    display: 'flex',
  },
});

/**
 * A controlled file list with a picker trigger. The actual system
 * picker is delegated via `onPickRequest` so this stays dependency-free.
 */
export function FileInput({
  value,
  onChange,
  label,
  placeholder = 'Choose a file',
  multiple = false,
  onPickRequest,
  xstyle,
  testID,
}: FileInputProps) {
  const tokens = useTokens();

  return (
    <View>
      {label != null ? <FieldLabel>{label}</FieldLabel> : null}
      <Btn
        onPress={onPickRequest}
        style={[
          styles.trigger,
          {
            backgroundColor: tokens['--color-background-body'] as string,
            borderColor: tokens['--color-border'] as string,
          },
          xstyle,
        ]}
        testID={testID}
      >
        <Text color="tertiary">
          {value.length === 0
            ? placeholder
            : multiple
              ? `${value.length} files`
              : (value[0]?.name ?? '')}
        </Text>
      </Btn>
      {value.length > 0 ? (
        <VStack gap={1}>
          {value.map((f, i) => (
            <HStack key={i} gap={2} align="center" justify="space-between">
              <Text size={13}>
                {f.name}
                {f.size != null ? (
                  <Text size={11} color="tertiary">
                    {' '}
                    · {(f.size / 1024).toFixed(0)} KB
                  </Text>
                ) : null}
              </Text>
              <Btn
                accessibilityLabel={`Remove ${f.name}`}
                onPress={() =>
                  onChange?.(multiple ? value.filter((_, j) => j !== i) : [])
                }
              >
                <Text size={12} color="critical">
                  Remove
                </Text>
              </Btn>
            </HStack>
          ))}
        </VStack>
      ) : null}
    </View>
  );
}
