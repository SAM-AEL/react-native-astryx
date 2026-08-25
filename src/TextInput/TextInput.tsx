import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Input } from '../internal/elements';

export interface TextInputProps extends BaseProps {
  /** Controlled value (upstream convention: inputs are always controlled). */
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  /** Red border + error semantics. */
  invalid?: boolean;
  secureTextEntry?: boolean;
  onSubmitEditing?: () => void;
}

const styles = css.create({
  base: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingHorizontal: '12px',
    paddingVertical: '10px',
    fontSize: '15px',
    display: 'flex',
  },
});

/** Single-line controlled text input. */
export function TextInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  secureTextEntry = false,
  onSubmitEditing,
  xstyle,
  testID,
}: TextInputProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  const borderColor = invalid
    ? (tokens['--color-critical'] as string)
    : (tokens['--color-border'] as string);

  return (
    <Input
      value={value}
      onChange={(e) => {
        const text = (e as unknown as { nativeEvent: { text?: string } })
          .nativeEvent?.text;
        if (typeof text === 'string') {
          onChange(text);
        }
      }}
      onSubmitEditing={onSubmitEditing}
      editable={!disabled}
      placeholder={placeholder}
      placeholderTextColor={tokens['--color-text-tertiary'] as string}
      secureTextEntry={secureTextEntry}
      ariaInvalid={invalid ? true : undefined}
      style={[
        styles.base,
        {
          backgroundColor: tokens['--color-background-body'] as string,
          borderColor,
          color: tokens['--color-text-primary'] as string,
          opacity: disabled ? 0.5 : 1,
        },
        getComponentOverride(theme, 'textinput'),
        xstyle,
      ]}
      testID={testID}
    />
  );
}
