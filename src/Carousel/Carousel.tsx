import { ScrollView } from 'react-native';
import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';

export interface CarouselProps extends BaseProps {
  children: React.ReactNode;
}

const styles = css.create({
  track: {
    display: 'flex',
    flexDirection: 'row',
    gap: '12px',
    paddingHorizontal: '16px',
    paddingVertical: '8px',
  },
});

/** Horizontal snap-scrolling strip of cards or media. */
export function Carousel({ children, xstyle, testID }: CarouselProps) {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.track as never}
      style={xstyle as never}
      testID={testID}
    >
      {children}
    </ScrollView>
  );
}
