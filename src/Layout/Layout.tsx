import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import { VStack } from '../VStack';
import { View } from '../internal/elements';

export interface LayoutProps extends BaseProps {
  header?: React.ReactNode;
  /** Persistent side region (e.g. a themed sidebar). */
  start?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
}

const styles = css.create({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  main: {
    flex: 1,
    display: 'flex',
    minWidth: 0,
  },
});

/**
 * Frame-first page scaffold (upstream's Layout pattern): budget the
 * shell regions before writing content.
 */
export function Layout({
  header,
  start,
  content,
  footer,
  xstyle,
  testID,
}: LayoutProps) {
  return (
    <View xstyle={[styles.root, xstyle]} testID={testID}>
      {start != null ? <View>{start}</View> : null}
      <View style={styles.main}>
        <VStack gap={0} xstyle={{ flex: 1 }}>
          {header}
          {content}
          {footer}
        </VStack>
      </View>
    </View>
  );
}
