import { Linking } from 'react-native';
import type { BaseProps } from '../BaseProps';
import { Text, type TextColor } from '../Text';
import { Btn } from '../internal/elements';

export interface LinkProps extends BaseProps {
  children: React.ReactNode;
  /** Destination URL opened with the OS handler. */
  href: string;
  color?: Extract<TextColor, 'accent'>;
}

/** External link text. Opens via the platform URL handler. */
export function Link({
  children,
  href,
  color = 'accent',
  xstyle,
  testID,
}: LinkProps) {
  return (
    <Btn
      onPress={() => {
        void Linking.openURL(href).catch(() => {});
      }}
      accessibilityLabel={typeof children === 'string' ? children : href}
      xstyle={xstyle}
      testID={testID}
    >
      <Text
        color={color}
        xstyle={[{ textDecorationLine: 'underline' } as never]}
      >
        {children}
      </Text>
    </Btn>
  );
}
