/**
 * Server-safe (React-free) token resolution, mirroring
 * `@astryxdesign/core/theme/tokens`.
 */

import type { AstryxTheme } from './defineTheme';
import { neutralTheme } from './neutralTheme';
import type { TokenMap } from './tokens';

export interface ResolveOptions {
  mode: 'light' | 'dark';
}

function pick(
  value: string | number | [string, string],
  mode: 'light' | 'dark'
): string | number {
  if (Array.isArray(value)) {
    return mode === 'dark' ? (value[1] ?? value[0]) : (value[0] ?? value[1]);
  }
  return value;
}

/** Resolve a theme's tokens to concrete values for a color mode. */
export function resolveThemeTokens(
  theme: AstryxTheme = neutralTheme,
  options: ResolveOptions
): TokenMap {
  const resolved: TokenMap = {};
  for (const [name, value] of Object.entries(theme.tokens)) {
    resolved[name] = pick(value, options.mode);
  }
  return resolved;
}
