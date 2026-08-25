import type { BaseProps } from '../BaseProps';
import { HStack } from '../HStack';
import { Avatar } from '../Avatar';

export interface AvatarGroupProps extends BaseProps {
  /** Ordered avatars; overflow renders into a +N badge. */
  avatars: Array<{ src?: string; initials?: string }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
}

const OVERLAP: Record<string, number> = { xs: 6, sm: 8, md: 12, lg: 16 };

/** Overlapping avatar stack with an overflow counter. */
export function AvatarGroup({
  avatars,
  max = 4,
  size = 'md',
  xstyle,
  testID,
}: AvatarGroupProps) {
  const visible = avatars.slice(0, max);
  const overflow = avatars.length - visible.length;

  return (
    <HStack gap={0} align="center" xstyle={xstyle} testID={testID}>
      {visible.map((a, i) => (
        <Avatar
          key={i}
          src={a.src}
          initials={a.initials}
          size={size}
          xstyle={{
            marginInlineEnd:
              i < visible.length - 1 || overflow > 0
                ? -((OVERLAP[size] as number | undefined) ?? 0)
                : 0,
          }}
        />
      ))}
      {overflow > 0 ? <Avatar initials={`+${overflow}`} size={size} /> : null}
    </HStack>
  );
}
