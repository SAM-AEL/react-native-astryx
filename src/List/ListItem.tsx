import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Text } from '../Text';
import { useTokens } from '../theme';
import { Btn, View } from '../internal/elements';

export interface ListItemProps extends BaseProps {
  /** Primary row text. */
  label: string;
  /** Secondary line under the label. */
  description?: string;
  /** Leading slot (e.g. Avatar, StatusDot). */
  leading?: React.ReactNode;
  /** Trailing slot (e.g. Badge, Chevron). */
  trailing?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '12px',
    paddingVertical: '12px',
    paddingHorizontal: '16px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
  },
  grow: { display: 'flex', flex: 1 },
});

/**
 * A single dense data row. Lists render edge-to-edge with dividers —
 * per upstream layout rules, prefer rows over cards for data.
 */
export function ListItem({
  label,
  description,
  leading,
  trailing,
  onPress,
  disabled = false,
  xstyle,
  testID,
}: ListItemProps) {
  const tokens = useTokens();

  const content = (
    <>
      {leading}
      <View style={styles.grow}>
        <Text>{label}</Text>
        {description != null ? (
          <Text color="secondary" size={13}>
            {description}
          </Text>
        ) : null}
      </View>
      {trailing}
    </>
  );

  const rowStyle = [
    styles.row,
    { borderBottomColor: tokens['--color-border'] as string },
    xstyle,
  ];

  if (onPress != null && !disabled) {
    return (
      <Btn onPress={onPress} style={rowStyle} testID={testID}>
        {content}
      </Btn>
    );
  }

  return (
    <View
      style={[...rowStyle, { opacity: disabled ? 0.5 : 1 }]}
      testID={testID}
    >
      {content}
    </View>
  );
}
