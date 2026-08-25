import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Text } from '../Text';
import { VStack } from '../VStack';
import { useTokens } from '../theme';
import { View } from '../internal/elements';

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps extends BaseProps {
  steps: readonly StepItem[];
  /** Zero-based index of the current step. */
  current: number;
}

const styles = css.create({
  dot: {
    width: '28px',
    height: '28px',
    borderRadius: '9999px',
    borderWidth: '2px',
    borderStyle: 'solid',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
});

/** Vertical progress indicator for multi-step flows. */
export function Stepper({ steps, current, xstyle, testID }: StepperProps) {
  const tokens = useTokens();

  return (
    <VStack gap={3} xstyle={xstyle} testID={testID}>
      {steps.map((step, index) => {
        const done = index < current;
        const active = index === current;
        return (
          <HStack key={index} gap={2} align="start">
            <View
              style={[
                styles.dot,
                done || active
                  ? {
                      backgroundColor: tokens['--color-accent'] as string,
                      borderColor: tokens['--color-accent'] as string,
                    }
                  : {
                      backgroundColor: 'transparent',
                      borderColor: tokens['--color-border-strong'] as string,
                    },
              ]}
            >
              <Text size={12} color={done || active ? 'inverse' : 'tertiary'}>
                {index + 1}
              </Text>
            </View>
            <View>
              <Text weight={active ? 'semibold' : 'regular'}>{step.label}</Text>
              {step.description != null ? (
                <Text size={13} color="secondary">
                  {step.description}
                </Text>
              ) : null}
            </View>
          </HStack>
        );
      })}
    </VStack>
  );
}
