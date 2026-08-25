import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Appearance } from 'react-native';
import type { AstryxTheme } from './defineTheme';
import { neutralTheme } from './neutralTheme';
import { resolveThemeTokens } from './resolveThemeTokens';
import type { TokenMap } from './tokens';

export type ColorMode = 'light' | 'dark';
export type ModeSetting = ColorMode | 'system';

export interface ThemeContextValue {
  theme: AstryxTheme;
  mode: ColorMode;
  tokens: TokenMap;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export interface ThemeProps {
  /** A theme created with `defineTheme` or shipped by a theme package. */
  theme?: AstryxTheme;
  /**
   * Color mode. `'system'` follows the OS preference (default),
   * matching the upstream `<Theme>` behavior.
   */
  mode?: ModeSetting;
  children: ReactNode;
}

function useSystemColorMode(): ColorMode {
  const [scheme, setScheme] = useState<ColorMode>(() =>
    Appearance.getColorScheme() === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(
      ({ colorScheme }: { colorScheme: string | null | undefined }) => {
        setScheme(colorScheme === 'dark' ? 'dark' : 'light');
      }
    );
    return () => sub.remove();
  }, []);

  return scheme;
}

/**
 * Provides design tokens to the component tree. Themes nest: wrap a
 * section in its own `<Theme>` to re-theme just that subtree, exactly
 * like the upstream web provider.
 */
export function Theme({
  theme = neutralTheme,
  mode = 'system',
  children,
}: ThemeProps) {
  const systemMode = useSystemColorMode();
  const effectiveMode: ColorMode = mode === 'system' ? systemMode : mode;

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      mode: effectiveMode,
      tokens: resolveThemeTokens(theme, { mode: effectiveMode }),
    }),
    [theme, effectiveMode]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Read resolved tokens and the effective color mode from context. */
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (ctx == null) {
    throw new Error(
      '[react-native-astryx] No <Theme> found. Wrap your app in <Theme> from react-native-astryx.'
    );
  }
  return ctx;
}

/** Non-throwing variant for components that render without a provider. */
export function useOptionalTheme(): ThemeContextValue | null {
  return useContext(ThemeContext);
}

/** Convenience hook: a token getter bound to the active theme + mode. */
export function useTokens(): TokenMap {
  const { tokens } = useTheme();
  return tokens;
}
