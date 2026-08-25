import type { BaseProps } from '../BaseProps';
import { Badge, type BadgeColor } from '../Badge';
import { HStack } from '../HStack';
import { StatusDot, type StatusColor } from '../StatusDot';
import { Text, type TextColor } from '../Text';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { Btn, View } from '../internal/elements';

export interface BannerProps extends BaseProps {
  title: string;
  description?: string;
  status?: StatusColor;
  badge?: string;
  badgeColor?: BadgeColor;
  /** Optional trailing action label + handler. */
  actionLabel?: string;
  onActionPress?: () => void;
}

const styles = css.create({
  base: {
    borderRadius: '10px',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '12px',
    display: 'flex',
  },
});

const BG_TOKENS: Record<StatusColor, string> = {
  neutral: '--color-background-surface',
  accent: '--color-accent-muted',
  success: '--color-success-muted',
  warning: '--color-warning-muted',
  critical: '--color-critical-muted',
};

const BORDER_TOKENS: Record<StatusColor, string> = {
  neutral: '--color-border',
  accent: '--color-accent',
  success: '--color-success',
  warning: '--color-warning',
  critical: '--color-critical',
};

const TEXT_COLORS: Record<StatusColor, TextColor> = {
  neutral: 'primary',
  accent: 'accent',
  success: 'success',
  warning: 'warning',
  critical: 'critical',
};

/** Inline callout communicating state or an important notice. */
export function Banner({
  title,
  description,
  status = 'neutral',
  badge,
  badgeColor = 'neutral',
  actionLabel,
  onActionPress,
  xstyle,
  testID,
}: BannerProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();

  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: tokens[BG_TOKENS[status]] as string,
          borderColor: tokens[BORDER_TOKENS[status]] as string,
        },
        getComponentOverride(theme, 'banner'),
        getComponentOverride(theme, 'banner', `status:${status}`),
        xstyle,
      ]}
      testID={testID}
    >
      <HStack gap={3} align="center">
        <StatusDot color={status} size={10} />
        <Text weight="semibold" color={TEXT_COLORS[status]}>
          {title}
        </Text>
        {badge != null ? <Badge label={badge} color={badgeColor} /> : null}
      </HStack>
      {description != null ? (
        <Text color="secondary" size={13}>
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
