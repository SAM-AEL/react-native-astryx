import { useState } from 'react';
import type { BaseProps } from '../BaseProps';
import { useOptionalTheme, useTokens } from '../theme';
import { getComponentOverride } from '../utils/componentOverrides';
import { css } from 'react-strict-dom';
import { View } from '../internal/elements';

export interface SliderProps extends BaseProps {
  /** Controlled value between `min` and `max`. */
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

const TRACK_HEIGHT = 4;
const THUMB_SIZE = 22;

const styles = css.create({
  trackWrap: {
    display: 'flex',
    justifyContent: 'center',
    paddingVertical: `${(THUMB_SIZE - TRACK_HEIGHT) / 2}px`,
  },
  track: {
    height: `${TRACK_HEIGHT}px`,
    width: '100%',
    borderRadius: '9999px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
  },
  fill: { height: '100%' },
  thumb: {
    position: 'absolute',
    width: `${THUMB_SIZE}px`,
    height: `${THUMB_SIZE}px`,
    borderRadius: '9999px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#D0D0D5',
  },
});

function snap(value: number, min: number, max: number, step: number): number {
  const clamped = Math.min(Math.max(value, min), max);
  if (step <= 0) {
    return Math.round(clamped);
  }
  const stepped = Math.round((clamped - min) / step) * step + min;
  return Math.min(Math.max(Number(stepped.toFixed(6)), min), max);
}

/**
 * A controlled slider. Values are chosen by tapping or dragging the
 * track; state stays owned by the caller.
 */
export function Slider({
  value,
  onChange,
  min = 0,
  max = 1,
  step = 0,
  disabled = false,
  xstyle,
  testID,
}: SliderProps) {
  const tokens = useTokens();
  const theme = useOptionalTheme();
  const [trackWidth, setTrackWidth] = useState(0);

  const fraction =
    max === min ? 0 : Math.min(1, Math.max(0, (value - min) / (max - min)));

  const applyFromX = (locationX: number | undefined) => {
    if (disabled || trackWidth <= 0 || locationX == null) {
      return;
    }
    onChange(
      snap(min + (locationX / trackWidth) * (max - min), min, max, step)
    );
  };

  return (
    <View
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout?.width ?? 0)}
      onTouchStart={(e) => applyFromX(e.nativeEvent.locationX)}
      onTouchMove={(e) => applyFromX(e.nativeEvent.locationX)}
      style={[styles.trackWrap, getComponentOverride(theme, 'slider'), xstyle]}
      testID={testID}
    >
      <View
        style={[
          styles.track,
          {
            backgroundColor: tokens['--color-background-inset'] as string,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
      >
        <View
          style={[
            styles.fill,
            {
              width: `${fraction * 100}%`,
              backgroundColor: tokens['--color-accent'] as string,
            },
          ]}
        />
      </View>
      <View
        style={[
          styles.thumb,
          {
            start: Math.round(fraction * Math.max(0, trackWidth - THUMB_SIZE)),
            backgroundColor: tokens['--color-background-body'] as string,
          },
        ]}
      />
    </View>
  );
}
