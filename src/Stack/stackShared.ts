import { css } from 'react-strict-dom';
import type { BaseProps } from '../BaseProps';
import type { TokenMap } from '../theme';

/**
 * Resolve a `gap`-style value: numbers map onto semantic spacing
 * tokens (`--spacing-N`) when one exists, otherwise treated as dp.
 */
export function resolveSpacing(
  tokens: TokenMap,
  value: number | string
): string | number {
  if (typeof value === 'number') {
    const token = tokens[`--spacing-${value}`];
    return typeof token === 'number' ? token : value;
  }
  return value;
}

/** Shared props for the stack family of layout components. */
export interface StackProps extends BaseProps {
  children?: React.ReactNode;
  /**
   * Space between children. Numbers reference spacing tokens
   * (e.g. 4 → `--spacing-4`), matching upstream's stack API.
   */
  gap?: number | string;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  /** Collapse to horizontal padding + vertical padding. */
  padding?: number | string;
  /** Grow to fill the main axis. */
  grow?: boolean;
}

const styles = css.create({
  base: { display: 'flex' },
});

const ALIGN_MAP = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
} as const;

const JUSTIFY_MAP = {
  'start': 'flex-start',
  'center': 'center',
  'end': 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
} as const;

export function stackLayoutStyle(
  tokens: TokenMap,
  {
    gap,
    align,
    justify,
    padding,
    grow,
  }: Pick<StackProps, 'gap' | 'align' | 'justify' | 'padding' | 'grow'>
): Record<string, string | number | undefined> {
  return {
    alignItems: align == null ? undefined : ALIGN_MAP[align],
    justifyContent: justify == null ? undefined : JUSTIFY_MAP[justify],
    rowGap: gap == null ? undefined : resolveSpacing(tokens, gap),
    columnGap: gap == null ? undefined : resolveSpacing(tokens, gap),
    padding: padding == null ? undefined : resolveSpacing(tokens, padding),
    flexGrow: grow === true ? 1 : undefined,
  };
}

export { styles as stackBaseStyles };
