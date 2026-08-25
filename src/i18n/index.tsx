import * as React from 'react';

/**
 * Lightweight i18n helpers. For full ICU message formatting pair this
 * module with `intl-messageformat` in your app; these utilities cover
 * locale-aware number/date formatting and simple dictionary lookup
 * without pulling a runtime dependency into the library.
 */

const LocaleContext = React.createContext<string>('en');

/** Sets the active locale string (BCP 47) for the subtree. */
export function InternationalizationProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

/** Active BCP 47 locale from the nearest provider (default 'en'). */
export function useLocale(): string {
  return React.useContext(LocaleContext);
}

/** Locale-aware number formatting bound to the active locale. */
export function useNumberFormatter(): (
  value: number,
  options?: Intl.NumberFormatOptions
) => string {
  const locale = useLocale();
  return React.useCallback(
    (value, options) => new Intl.NumberFormat(locale, options).format(value),
    [locale]
  );
}

/** Simple nested-dictionary translator: t('cart.title'). */
export function createTranslator<Messages extends Record<string, unknown>>(
  messages: Messages
) {
  return function t(path: string, fallback?: string): string {
    const parts = path.split('.');
    let node: unknown = messages;
    for (const part of parts) {
      if (node != null && typeof node === 'object' && part in node) {
        node = (node as Record<string, unknown>)[part];
      } else {
        return fallback ?? path;
      }
    }
    return typeof node === 'string' ? node : (fallback ?? path);
  };
}
