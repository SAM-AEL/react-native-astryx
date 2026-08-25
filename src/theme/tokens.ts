/**
 * Semantic design token names and default values.
 *
 * Token names mirror upstream Astryx 1:1 (`--color-text-primary`,
 * `--spacing-4`, ...) so themes written for `@astryxdesign/core` port
 * directly. On native there are no CSS custom properties, so tokens are
 * resolved to concrete values by the Theme provider (see `Theme.tsx`)
 * and consumed through `useTheme()`.
 */

export type ColorSchemeValue = string | [light: string, dark: string];

export type TokenMap = Record<string, string | number>;

/** Neutral palette seed, mirroring @astryxdesign/theme-neutral. */
const NEUTRAL: Record<string, ColorSchemeValue> = {
  '--color-background-body': ['#FFFFFF', '#0A0A0A'],
  '--color-background-surface': ['#F5F5F5', '#1A1A1C'],
  '--color-background-surface-hover': ['#ECECEC', '#242428'],
  '--color-background-inset': ['#EFEFF1', '#141416'],
  '--color-background-inverse': ['#1B1B1B', '#F2F2F2'],
  '--color-text-primary': ['#1B1B1B', '#F2F2F2'],
  '--color-text-secondary': ['#55555C', '#9E9EA6'],
  '--color-text-tertiary': ['#8A8A93', '#6E6E78'],
  '--color-text-inverse': ['#F2F2F2', '#1B1B1B'],
  '--color-text-accent': ['#0064E0', '#2694FE'],
  '--color-text-success': ['#1D7A3E', '#4BD37B'],
  '--color-text-warning': ['#8A5A00', '#F5B93C'],
  '--color-text-critical': ['#C8311B', '#FF7361'],
  '--color-accent': ['#0064E0', '#2694FE'],
  '--color-accent-muted': ['#E3EEFD', '#0B2A4A'],
  '--color-on-accent': ['#FFFFFF', '#FFFFFF'],
  '--color-border': ['#DEDEE2', '#333338'],
  '--color-border-strong': ['#B9B9C0', '#4A4A52'],
  '--color-focus': ['#0064E0', '#2694FE'],
  '--color-success': ['#1D7A3E', '#4BD37B'],
  '--color-success-muted': ['#E4F3E9', '#12291A'],
  '--color-warning': ['#B97E00', '#F5B93C'],
  '--color-warning-muted': ['#FBF2DC', '#33270D'],
  '--color-critical': ['#C8311B', '#FF7361'],
  '--color-critical-muted': ['#FBE9E6', '#38150F'],
  '--color-overlay': ['rgba(0, 0, 0, 0.45)', 'rgba(0, 0, 0, 0.65)'],
};

const SPACING: Record<string, number> = {
  '--spacing-0': 0,
  '--spacing-025': 1,
  '--spacing-05': 2,
  '--spacing-1': 4,
  '--spacing-2': 8,
  '--spacing-3': 12,
  '--spacing-4': 16,
  '--spacing-5': 20,
  '--spacing-6': 24,
  '--spacing-8': 32,
  '--spacing-10': 40,
  '--spacing-12': 48,
  '--spacing-16': 64,
  '--spacing-20': 80,
};

const RADIUS: Record<string, number> = {
  '--radius-inner': 4,
  '--radius-element': 8,
  '--radius-container': 12,
  '--radius-page': 16,
  '--radius-chat': 18,
  '--radius-full': 9999,
};

const TYPOGRAPHY: Record<string, string | number> = {
  '--font-family-body': '-apple-system, Roboto, sans-serif',
  '--font-family-heading': '-apple-system, Roboto, sans-serif',
  '--font-family-code': 'Menlo, monospace',
  '--text-heading-1-size': 32,
  '--text-heading-1-weight': '700',
  '--text-heading-2-size': 24,
  '--text-heading-2-weight': '700',
  '--text-heading-3-size': 20,
  '--text-heading-3-weight': '600',
  '--text-heading-4-size': 17,
  '--text-heading-4-weight': '600',
  '--text-body-size': 15,
  '--text-body-weight': '400',
  '--text-body-small-size': 13,
  '--text-body-small-weight': '400',
  '--text-caption-size': 11,
  '--text-caption-weight': '500',
};

const MOTION: Record<string, number> = {
  '--duration-fast-min': 100,
  '--duration-fast': 150,
  '--duration-fast-max': 200,
  '--duration-medium-min': 300,
  '--duration-medium': 400,
  '--duration-medium-max': 500,
};

/** The full default token set (neutral scheme, light+dark pairs). */
export const DEFAULT_TOKENS: Record<string, ColorSchemeValue | number> = {
  ...NEUTRAL,
  ...SPACING,
  ...RADIUS,
  ...TYPOGRAPHY,
  ...MOTION,
};

/** All semantic color token names exported for tooling/tests. */
export const COLOR_TOKEN_NAMES = Object.keys(NEUTRAL);
