import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useOptionalTheme } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, Txt, View } from '../internal/elements';

export interface EmptyStateProps extends BaseProps {
  /** Large glyph or emoji marking the empty area. */
  glyph?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  onActionPress?: () => void;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    padding: '32px',
  },
  glyph: { fontSize: '40px' },
});

/** Placeholder for lists and screens with no content yet. */
export function EmptyState({
  glyph = '○',
  title,
  description,
  actionLabel,
  onActionPress,
  xstyle,
  testID,
}: EmptyStateProps) {
  const theme = useOptionalTheme();

  return (
    <View
      style={[styles.base, getComponentOverride(theme, 'emptystate'), xstyle]}
      testID={testID}
    >
      <Text weight="semibold" size={17}>
        {glyph === '' ? null : (
          <Txt style={[styles.glyph, { display: 'block' }]}>{glyph}</Txt>
        )}
        {title}
      </Text>
      {description != null ? (
        <Text color="secondary" align="center">
          {description}
        </Text>
      ) : null}
      {actionLabel != null && onActionPress != null ? (
        <Btn onPress={onActionPress}>
          <Text color="accent" weight="semibold">
            {actionLabel}
          </Text>
        </Btn>
      ) : null}
    </View>
  );
}
