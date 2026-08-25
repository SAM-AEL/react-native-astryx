import { describe, it, expect } from 'vitest';
import { defineTheme } from '../src/theme/defineTheme';
import { neutralTheme } from '../src/theme/neutralTheme';
import { resolveThemeTokens } from '../src/theme/resolveThemeTokens';
import { DEFAULT_TOKENS, COLOR_TOKEN_NAMES } from '../src/theme/tokens';

describe('DEFAULT_TOKENS', () => {
  it('defines every color token as a [light, dark] pair', () => {
    for (const name of COLOR_TOKEN_NAMES) {
      const value = DEFAULT_TOKENS[name];
      expect(Array.isArray(value), `${name} should be a tuple`).toBe(true);
      const [light, dark] = value as [string, string];
      expect(light, `${name} light`).toBeTruthy();
      expect(dark, `${name} dark`).toBeTruthy();
    }
  });

  it('exposes the full spacing scale', () => {
    for (const step of [
      '0',
      '025',
      '05',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '8',
      '10',
      '12',
      '16',
      '20',
    ]) {
      expect(typeof DEFAULT_TOKENS[`--spacing-${step}`]).toBe('number');
    }
  });

  it('orders spacing monotonically', () => {
    const steps = [
      '0',
      '05',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '8',
      '10',
      '12',
      '16',
      '20',
    ];
    const values = steps.map((s) => DEFAULT_TOKENS[`--spacing-${s}`] as number);
    for (let i = 1; i < values.length; i++) {
      expect(values[i]).toBeGreaterThanOrEqual(values[i - 1]!);
    }
  });
});

describe('neutralTheme', () => {
  it('resolves to distinct light and dark token maps', () => {
    const light = resolveThemeTokens(neutralTheme, { mode: 'light' });
    const dark = resolveThemeTokens(neutralTheme, { mode: 'dark' });
    expect(light['--color-background-body']).not.toBe(
      dark['--color-background-body']
    );
  });

  it('keeps non-color tokens identical across modes', () => {
    const light = resolveThemeTokens(neutralTheme, { mode: 'light' });
    const dark = resolveThemeTokens(neutralTheme, { mode: 'dark' });
    for (const key of Object.keys(DEFAULT_TOKENS)) {
      if (key.startsWith('--color-')) continue;
      expect(light[key], key).toBe(dark[key]);
    }
  });

  it('is frozen against accidental mutation', () => {
    expect(Object.isFrozen(neutralTheme)).toBe(true);
  });
});

describe('defineTheme', () => {
  it('accepts a single accent color and seeds derived tokens', () => {
    const theme = defineTheme({
      name: 'brand',
      color: { accent: '#7B61FF' },
    });
    const tokens = theme.tokens;
    expect(tokens['--color-accent']).toBe('#7B61FF');
    // Derived tokens re-point to the accent
    const [mutedLight] = tokens['--color-accent-muted'] as [string, string];
    expect(mutedLight).toMatch(/^rgba\(123, 97, 255,/);
    const [textAccentLight] = tokens['--color-text-accent'] as [string, string];
    expect(textAccentLight).toBe('#7B61FF');
  });

  it('accepts a [light, dark] accent tuple', () => {
    const theme = defineTheme({
      name: 'brand',
      color: { accent: ['#7B61FF', '#9B85FF'] },
    });
    expect(theme.tokens['--color-accent']).toEqual(['#7B61FF', '#9B85FF']);
  });

  it('inherits everything from extends and overrides only what differs', () => {
    const child = defineTheme({
      name: 'child',
      extends: neutralTheme,
      tokens: { '--radius-element': 20 },
    });
    const base = resolveThemeTokens(neutralTheme, { mode: 'light' });
    const resolved = resolveThemeTokens(child, { mode: 'light' });

    expect(resolved['--radius-element']).toBe(20); // overridden
    expect(resolved['--radius-container']).toBe(base['--radius-container']); // inherited
    expect(resolved['--color-text-primary']).toBe(base['--color-text-primary']); // inherited
  });

  it('generates a typography scale from base + ratio', () => {
    const theme = defineTheme({
      name: 'scaled',
      typography: { scale: { base: 14, ratio: 1.25 } },
    });
    const t = theme.tokens;
    expect(t['--text-body-size']).toBe(14);
    expect(t['--text-heading-4-size']).toBe(Math.round(14 * 1.25));
    expect(t['--text-heading-3-size']).toBe(Math.round(14 * 1.25 ** 2));
  });

  it('scales radii by multiplier', () => {
    const theme = defineTheme({ name: 'round', radius: { multiplier: 2 } });
    const resolved = resolveThemeTokens(theme, { mode: 'light' });
    const baseElement = DEFAULT_TOKENS['--radius-element'] as number;
    expect(resolved['--radius-element']).toBe(baseElement * 2);
  });

  it('explicit token overrides beat scale-generated values', () => {
    const theme = defineTheme({
      name: 'override',
      color: { accent: '#FF0000' },
      tokens: { '--color-accent': '#00FF00' },
    });
    expect(theme.tokens['--color-accent']).toBe('#00FF00');
  });

  it('merges component overrides across extends', () => {
    const parent = defineTheme({
      name: 'parent',
      components: { button: { base: { borderRadius: '9999px' } } },
    });
    const child = defineTheme({
      name: 'child',
      extends: parent,
      components: { card: { base: { padding: '24px' } } },
    });
    expect(child.components.button).toBeDefined();
    expect(child.components.card).toBeDefined();
  });
});

describe('resolveThemeTokens', () => {
  it('picks the dark side of tuples in dark mode', () => {
    const resolved = resolveThemeTokens(neutralTheme, { mode: 'dark' });
    const [, darkBody] = neutralTheme.tokens['--color-background-body'] as [
      string,
      string,
    ];
    expect(resolved['--color-background-body']).toBe(darkBody);
  });

  it('returns only concrete values (no tuples leak through)', () => {
    const resolved = resolveThemeTokens(neutralTheme, { mode: 'light' });
    for (const [key, value] of Object.entries(resolved)) {
      if (key.startsWith('--color-')) {
        expect(Array.isArray(value), `${key} leaked a tuple`).toBe(false);
      }
    }
  });
});
