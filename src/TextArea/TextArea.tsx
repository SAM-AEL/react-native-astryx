import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { TArea } from '../internal/elements';

export interface TextAreaProps extends BaseProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  /** Minimum height in dp. */
  minRows?: number;
  maxLength?: number;
}

const styles = css.create({
  base: {
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
    paddingHorizontal: '12px',
    paddingVertical: '10px',
    fontSize: '15px',
    textAlignVertical: 'top',
    display: 'flex',
  },
});

/** Multi-line controlled text input. */
export function TextArea({
  value,
  onChange,
  placeholder,
  disabled = false,
  invalid = false,
  minRows = 3,
  maxLength,
  xstyle,
  testID,
}: TextAreaProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <TArea
      value={value}
      multiline={true}
      numberOfLines={minRows}
      maxLength={maxLength}
      onChange={(e) => {
        const text = (e as unknown as { nativeEvent: { text?: string } })
          .nativeEvent?.text;
        if (typeof text === 'string') {
          onChange(text);
        }
      }}
      editable={!disabled}
      placeholder={placeholder}
      placeholderTextColor={tokens['--color-text-tertiary'] as string}
      ariaInvalid={invalid ? true : undefined}
      style={[
        styles.base,
        {
          minHeight: `${minRows * 22 + 20}px`,
          backgroundColor: tokens['--color-background-body'] as string,
          borderColor: invalid
            ? (tokens['--color-critical'] as string)
            : (tokens['--color-border'] as string),
          color: tokens['--color-text-primary'] as string,
          opacity: disabled ? 0.5 : 1,
        },
        getComponentOverride(theme, 'textarea'),
        xstyle,
      ]}
      testID={testID}
    />
  );
}
