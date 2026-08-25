/**
 * defineTheme — mirrors the upstream `defineTheme()` schema so theme
 * configs written for @astryxdesign/core port to React Native.
 *
 * A native theme resolves to two flat token maps (light and dark).
 * `[light, dark]` tuples switch per mode; single values apply to both.
 */

import { DEFAULT_TOKENS, type ColorSchemeValue } from './tokens';

type ComponentOverride = Record<string, unknown>;

export interface ThemeConfig {
  name: string;
  extends?: AstryxTheme;
  color?: {
    accent?: string | [string, string];
    neutralStyle?: 'warm' | 'cool' | 'neutral';
    contrast?: 'standard' | 'high';
  };
  typography?: {
    scale?: { base?: number; ratio?: number };
    body?: { family?: string };
    heading?: { family?: string };
    code?: { family?: string };
  };
  radius?: { base?: number; multiplier?: number };
  motion?: { fast?: number; medium?: number; ratio?: number };
  tokens?: Record<string, ColorSchemeValue | number>;
  components?: Record<string, ComponentOverride>;
}

export interface AstryxTheme {
  readonly name: string;
  readonly tokens: Record<string, ColorSchemeValue | number>;
  readonly components: Record<string, ComponentOverride>;
  /** Marks themes produced by `astryx-native build` pipelines. */
  readonly __built?: boolean;
}

function resolveScale(
  config: ThemeConfig
): Record<string, ColorSchemeValue | number> {
  const out: Record<string, ColorSchemeValue | number> = {};

  const accent = config.color?.accent;
  if (accent !== undefined) {
    out['--color-accent'] = accent;
    const [light, dark] = Array.isArray(accent) ? accent : [accent, accent];
    out['--color-accent-muted'] = [
      withAlpha(light, 0.12),
      withAlpha(dark, 0.25),
    ];
    out['--color-text-accent'] = [light, dark];
  }

  const base = config.typography?.scale?.base ?? 15;
  const ratio = config.typography?.scale?.ratio ?? 1.2;
  out['--text-body-size'] = base;
  out['--text-heading-4-size'] = Math.round(base * ratio);
  out['--text-heading-3-size'] = Math.round(base * ratio * ratio);
  out['--text-heading-2-size'] = Math.round(base * ratio ** 3);
  out['--text-heading-1-size'] = Math.round(base * ratio ** 4);

  const bodyFamily = config.typography?.body?.family;
  if (bodyFamily) {
    out['--font-family-body'] = bodyFamily;
  }
  const headingFamily = config.typography?.heading?.family;
  if (headingFamily) {
    out['--font-family-heading'] = headingFamily;
  }
  const codeFamily = config.typography?.code?.family;
  if (codeFamily) {
    out['--font-family-code'] = codeFamily;
  }

  const multiplier = config.radius?.multiplier ?? 1;
  if (multiplier !== 1) {
    for (const key of ['inner', 'element', 'container', 'page', 'chat']) {
      const fallback = DEFAULT_TOKENS[`--radius-${key}`];
      out[`--radius-${key}`] = Math.round(
        (typeof fallback === 'number' ? fallback : 8) * multiplier
      );
    }
  }

  return out;
}

/** Multiply a hex color's alpha (keeps rgba() values untouched). */
function withAlpha(hex: string, alpha: number): string {
  if (!hex.startsWith('#') || hex.length < 7) {
    return hex;
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function defineTheme(config: ThemeConfig): AstryxTheme {
  const base = config.extends;

  const tokens: Record<string, ColorSchemeValue | number> = {
    ...DEFAULT_TOKENS,
    ...(base?.tokens ?? {}),
    ...resolveScale(config),
    ...(config.tokens ?? {}),
  };

  const components: Record<string, ComponentOverride> = {
    ...(base?.components ?? {}),
    ...(config.components ?? {}),
  };

  return Object.freeze({ name: config.name, tokens, components });
}
