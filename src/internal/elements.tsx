/**
 * Typed element layer over react-strict-dom.
 *
 * RSD's public TypeScript surface is intentionally web-strict; several
 * props that its native runtime fully supports (testID,
 * accessibilityState, numberOfLines, ...) are untyped. These thin
 * wrappers restore precise types for the native props we rely on and
 * give every Astryx component a single, consistent call signature.
 * react-strict-dom remains the styling/rendering engine underneath.
 */

import type { ComponentType, ReactNode } from 'react';
import { css, html } from 'react-strict-dom';

/** Anything accepted by the RSD `style` prop: statics, plain token objects, overrides. */
export type StyleProp = unknown;

export interface NativeEventLike {
  nativeEvent: {
    locationX?: number;
    locationY?: number;
    text?: string;
    layout?: { width: number; height: number };
  };
}

interface BaseElementProps {
  children?: ReactNode;
  style?: StyleProp;
  /** Alias kept for parity with Astryx component props. */
  xstyle?: StyleProp;
  testID?: string;
  accessibilityLabel?: string;
  accessibilityState?: {
    busy?: boolean;
    checked?: boolean | 'mixed';
    disabled?: boolean;
    expanded?: boolean;
    selected?: boolean;
  };
}

export interface ViewProps extends BaseElementProps {
  onLayout?: (event: NativeEventLike) => void;
  onTouchStart?: (event: NativeEventLike) => void;
  onTouchMove?: (event: NativeEventLike) => void;
  onTouchEnd?: (event: NativeEventLike) => void;
  onTouchCancel?: (event: NativeEventLike) => void;
  pointerEvents?: 'auto' | 'none' | 'box-none' | 'box-only';
}

export interface TextElementProps extends BaseElementProps {
  numberOfLines?: number;
  selectable?: boolean;
}

export interface PressableProps extends BaseElementProps {
  /** Tap handler (mapped to onClick for react-strict-dom). */
  onPress?: () => void;
  disabled?: boolean;
  role?: string;
  ariaLabel?: string;
  ariaInvalid?: boolean;
}

export interface ImageElementProps {
  src: string;
  style?: StyleProp;
  testID?: string;
  accessibilityLabel?: string;
}

export interface InputElementProps extends Omit<BaseElementProps, 'children'> {
  value: string;
  onChange?: (event: NativeEventLike) => void;
  onSubmitEditing?: () => void;
  editable?: boolean;
  placeholder?: string;
  placeholderTextColor?: string;
  secureTextEntry?: boolean;
  inputMode?: 'text' | 'decimal' | 'numeric' | 'email' | 'phone';
  multiline?: boolean;
  maxLength?: number;
  numberOfLines?: number;
  ariaInvalid?: boolean;
}

type Cast<TProps> = ComponentType<TProps>;

function wrap<TProps>(element: unknown): Cast<TProps> {
  return element as Cast<TProps>;
}

function ViewEl(props: ViewProps): ReactNode {
  const Div = wrap<ViewProps>(html.div);
  return <Div {...props} />;
}
function TxtEl(props: TextElementProps): ReactNode {
  const Span = wrap<TextElementProps>(html.span);
  return <Span {...props} />;
}
function BtnEl(props: PressableProps): ReactNode {
  const Button = wrap<PressableProps>(html.button);
  return <Button {...props} />;
}
function ImgEl(props: ImageElementProps): ReactNode {
  const Image = wrap<ImageElementProps>(html.img);
  return <Image {...props} />;
}
function InputEl(props: InputElementProps): ReactNode {
  const InputField = wrap<InputElementProps>(html.input);
  return <InputField {...props} />;
}
function TextAreaEl(props: InputElementProps): ReactNode {
  const Area = wrap<InputElementProps>(html.textarea);
  return <Area {...props} />;
}
function Heading1El(props: TextElementProps): ReactNode {
  const H1El = wrap<TextElementProps>(html.h1);
  return <H1El {...props} />;
}
function Heading2El(props: TextElementProps): ReactNode {
  const H2El = wrap<TextElementProps>(html.h2);
  return <H2El {...props} />;
}
function Heading3El(props: TextElementProps): ReactNode {
  const H3El = wrap<TextElementProps>(html.h3);
  return <H3El {...props} />;
}
function Heading4El(props: TextElementProps): ReactNode {
  const H4El = wrap<TextElementProps>(html.h4);
  return <H4El {...props} />;
}

export const View = ViewEl;
export const Txt = TxtEl;
/** Tap target mapped to the semantic button element. Takes `onPress`. */
export const Btn = BtnEl;
export const Img = ImgEl;
export const Input = InputEl;
export const TArea = TextAreaEl;
export const H1 = Heading1El;
export const H2 = Heading2El;
export const H3 = Heading3El;
export const H4 = Heading4El;

/**
 * Merge static styles, token-derived plain objects, theme overrides and
 * consumer `xstyle` into a single RSD-compatible style array. Falsy
 * entries are dropped so callers can spread conditionals freely.
 */
export function sx(...parts: ReadonlyArray<unknown>): unknown[] {
  return parts.filter((part) => part != null && part !== false);
}

export { css };
