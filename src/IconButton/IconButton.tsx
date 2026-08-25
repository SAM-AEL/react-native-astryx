import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, Txt } from '../internal/elements';

export interface IconButtonProps extends BaseProps {
  /** Icon glyph or single character. */
  icon: string;
  /** Accessible name — required, the button is otherwise unlabeled. */
  accessibilityLabel: string;
  variant?: 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onPress?: () => void;
  disabled?: boolean;
}

const styles = css.create({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    borderWidth: '1px',
    borderStyle: 'solid',
  },
  sm: { width: '32px', height: '32px' },
  md: { width: '40px', height: '40px' },
  lg: { width: '48px', height: '48px' },
  smIcon: { fontSize: '14px' },
  mdIcon: { fontSize: '18px' },
  lgIcon: { fontSize: '22px' },
});

const SIZES = { sm: styles.sm, md: styles.md, lg: styles.lg } as const;
const ICON_SIZES = {
  sm: styles.smIcon,
  md: styles.mdIcon,
  lg: styles.lgIcon,
} as const;

/** A square, icon-only action. Always pass `accessibilityLabel`. */
export function IconButton({
  icon,
  accessibilityLabel,
  variant = 'ghost',
  size = 'md',
  onPress,
  disabled = false,
  xstyle,
  testID,
}: IconButtonProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  const colors =
    disabled === true
      ? {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          color: tokens['--color-text-tertiary'] as string,
        }
      : variant === 'secondary'
        ? {
            backgroundColor: tokens['--color-background-surface'] as string,
            borderColor: tokens['--color-border'] as string,
            color: tokens['--color-text-primary'] as string,
          }
        : {
            backgroundColor: 'transparent',
            borderColor: 'transparent',
            color: tokens['--color-text-accent'] as string,
          };

  return (
    <Btn
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      ariaLabel={accessibilityLabel}
      style={[
        styles.base,
        SIZES[size],
        colors,
        getComponentOverride(theme, 'iconbutton'),
        xstyle,
      ]}
      testID={testID}
    >
      <Txt style={[ICON_SIZES[size], { fontWeight: 600 }]}>{icon}</Txt>
    </Btn>
  );
}
