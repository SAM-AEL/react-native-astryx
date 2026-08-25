import type { AstryxTheme } from '../theme';
import type { ThemeContextValue } from '../theme';

type ThemeSource = AstryxTheme | ThemeContextValue | null | undefined;

function resolveTheme(source: ThemeSource): AstryxTheme | undefined {
  if (source == null) {
    return undefined;
  }
  // Accept either the theme object itself or the useTheme() context value.
  return 'mode' in source ? source.theme : source;
}

/**
 * Read a component override declared in a theme's `components` map,
 * e.g. `theme.components.button.base`. Returns undefined when absent.
 */
export function getComponentOverride(
  themeSource: ThemeSource,
  componentKey: string,
  selector = 'base'
): Record<string, unknown> | undefined {
  const theme = resolveTheme(themeSource);
  const override = theme?.components?.[componentKey];
  if (
    override != null &&
    typeof override === 'object' &&
    selector in override
  ) {
    const value = (override as Record<string, unknown>)[selector];
    if (value != null && typeof value === 'object') {
      return value as Record<string, unknown>;
    }
  }
  return undefined;
}
