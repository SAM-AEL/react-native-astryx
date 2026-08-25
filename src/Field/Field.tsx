import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text, type TextColor } from '../Text';
import { VStack } from '../VStack';
import { useOptionalTheme } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';

export interface FieldProps extends BaseProps {
  label?: string;
  /** Helper or error message; `error: true` renders it critically. */
  status?: string;
  statusError?: boolean;
  children?: React.ReactNode;
}

const styles = css.create({
  base: { display: 'flex' },
});

/**
 * Labels and annotates a single input. The child stays in control of
 * its own value — Field only handles presentation.
 */
export function Field({
  label,
  status,
  statusError = false,
  children,
  xstyle,
  testID,
}: FieldProps) {
  const theme = useOptionalTheme();

  return (
    <VStack
      gap={1}
      xstyle={[styles.base, getComponentOverride(theme, 'field'), xstyle]}
      testID={testID}
    >
      {label != null ? <FieldLabel>{label}</FieldLabel> : null}
      {children}
      {status != null ? (
        <FieldStatus error={statusError}>{status}</FieldStatus>
      ) : null}
    </VStack>
  );
}

export interface FieldLabelProps extends BaseProps {
  children: React.ReactNode;
}

/** Small semibold label above a field. */
export function FieldLabel({ children, xstyle, testID }: FieldLabelProps) {
  return (
    <Text size={13} weight="medium" xstyle={xstyle} testID={testID}>
      {children}
    </Text>
  );
}

export interface FieldStatusProps extends BaseProps {
  children: React.ReactNode;
  error?: boolean;
}

/** Helper text below a field; red when `error`. */
export function FieldStatus({
  children,
  error = false,
  xstyle,
  testID,
}: FieldStatusProps) {
  const color: TextColor = error ? 'critical' : 'secondary';
  return (
    <Text size={12} color={color} xstyle={xstyle} testID={testID}>
      {children}
    </Text>
  );
}
