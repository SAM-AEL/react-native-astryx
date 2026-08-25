import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { Btn, View } from '../internal/elements';

export interface ItemProps extends BaseProps {
  /** Primary content of the row. */
  children?: React.ReactNode;
  /** Leading slot (icon, avatar). */
  leading?: React.ReactNode;
  /** Trailing slot (badge, chevron). */
  trailing?: React.ReactNode;
  onPress?: () => void;
  disabled?: boolean;
}

const styles = css.create({
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '10px',
    paddingVertical: '10px',
    paddingHorizontal: '12px',
  },
});

/** The lowest-level selectable row primitive behind lists and menus. */
export function Item({
  children,
  leading,
  trailing,
  onPress,
  disabled = false,
  xstyle,
  testID,
}: ItemProps) {
  const inner = (
    <>
      {leading}
      <View style={{ flex: 1, display: 'flex' }}>{children}</View>
      {trailing}
    </>
  );

  return onPress != null && !disabled ? (
    <Btn
      onPress={onPress}
      disabled={disabled}
      style={[styles.row, xstyle]}
      testID={testID}
    >
      {inner}
    </Btn>
  ) : (
    <View
      style={[styles.row, { opacity: disabled ? 0.5 : 1 }, xstyle]}
      testID={testID}
    >
      {inner}
    </View>
  );
}
