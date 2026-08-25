import { describe, it, expect } from 'vitest';
import { resolveSpacing, stackLayoutStyle } from '../src/Stack/stackShared';
import { defineTheme } from '../src/theme/defineTheme';
import { neutralTheme } from '../src/theme/neutralTheme';
import { resolveThemeTokens } from '../src/theme/resolveThemeTokens';
import { getComponentOverride } from '../src/utils/componentOverrides';

const tokens = resolveThemeTokens(neutralTheme, { mode: 'light' });

function makeOverride(
  themeLike: unknown
): NonNullable<ReturnType<typeof getComponentOverride>> | undefined {
  return getComponentOverride(themeLike as never, 'button');
}

describe('resolveSpacing', () => {
  it('maps known steps onto spacing tokens', () => {
    // --spacing-4 === 16
    expect(resolveSpacing(tokens, 4)).toBe(tokens['--spacing-4']);
  });

  it('falls back to the raw number when no token exists', () => {
    expect(resolveSpacing(tokens, 7)).toBe(7);
  });

  it('passes string values through untouched', () => {
    expect(resolveSpacing(tokens, '12px')).toBe('12px');
  });
});

describe('stackLayoutStyle', () => {
  it('maps align/justify enums to flex values', () => {
    const style = stackLayoutStyle(tokens, {
      align: 'start',
      justify: 'space-between',
    });
    expect(style.alignItems).toBe('flex-start');
    expect(style.justifyContent).toBe('space-between');
  });

  it('applies gap on both axes', () => {
    const style = stackLayoutStyle(tokens, { gap: 2 });
    expect(style.rowGap).toBeTruthy();
    expect(style.columnGap).toBeTruthy();
    expect(style.rowGap).toBe(style.columnGap);
  });

  it('omits unset props rather than writing nulls', () => {
    const style = stackLayoutStyle(tokens, {});
    expect(style.alignItems).toBeUndefined();
    expect(style.justifyContent).toBeUndefined();
    expect(style.rowGap).toBeUndefined();
    expect(style.flexGrow).toBeUndefined();
  });

  it('grows on demand', () => {
    const style = stackLayoutStyle(tokens, { grow: true });
    expect(style.flexGrow).toBe(1);
  });
});

describe('getComponentOverride', () => {
  it('reads base overrides from a theme object', () => {
    const theme = defineTheme({
      name: 't',
      components: { button: { base: { borderRadius: '9999px' } } },
    });
    expect(makeOverride(theme)?.borderRadius).toBe('9999px');
  });

  it('also accepts a useTheme() context value', () => {
    const theme = defineTheme({
      name: 't',
      components: { button: { 'variant:ghost': { borderWidth: '2px' } } },
    });
    const ctxLike = { theme, mode: 'light', tokens };
    expect(
      getComponentOverride(ctxLike as never, 'button', 'variant:ghost')
    ).toBeDefined();
  });

  it('returns undefined when nothing is declared', () => {
    expect(makeOverride(null)).toBeUndefined();
    expect(makeOverride(undefined)).toBeUndefined();
    expect(makeOverride(neutralTheme)).toBeUndefined();
  });

  it('ignores non-object override values', () => {
    const bad = { components: { button: { base: 'oops' } } };
    expect(makeOverride(bad)).toBeUndefined();
  });
});
