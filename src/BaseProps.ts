/**
 * Props shared by every Astryx component, mirroring upstream's
 * `BaseProps`: identity for tests plus the universal style override.
 */
export interface BaseProps {
  /** Test hook identifier. */
  testID?: string;
  /**
   * Style overrides created with `css.create()` from react-strict-dom
   * (the native equivalent of upstream's StyleX `xstyle`). Accepts a
   * single style, an array of styles, or plain style objects for
   * token-derived values. Later entries win over component defaults.
   */
  xstyle?: unknown;
}
