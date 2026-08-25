<div align="center">

<br/>

# ⬡ react-native-astryx

**The Astryx design system, rebuilt for React Native.**

[![npm version](https://img.shields.io/npm/v/react-native-astryx.svg?style=flat-square&color=7B61FF)](https://www.npmjs.com/package/react-native-astryx)
[![license MIT](https://img.shields.io/badge/license-MIT-1D7A3E.svg?style=flat-square)](./LICENSE)
![status alpha](https://img.shields.io/badge/status-alpha-orange?style=flat-square)

<br/>

> [!WARNING]
>
> ## 🚧 Early build — not for production
>
> This library is in active development.
> APIs will change without notice between releases.
>
> **Use it to experiment, evaluate, and prototype —**
> **pin your version if you build on it.**

</div>

<br/>

---

A spec-synced port of [facebook/astryx](https://github.com/facebook/astryx) —
Meta's open-source design system — for **iOS and Android**, built on
[react-strict-dom](https://github.com/facebook/react-strict-dom) and
[StyleX](https://stylexjs.com).

Same token names. Same component APIs. Same `defineTheme` schema.

No babel config. No Metro config. Install and go.

<br/>

## ✦ Install

```bash
npm install react-native-astryx
```

Requires React 19+ and React Native 0.79.5+.

<br/>

## ✦ Usage

Wrap once. Build everywhere.

```tsx
import {Theme, neutralTheme, VStack, Button} from 'react-native-astryx';

<Theme theme={neutralTheme} mode="system">
  <VStack gap={4} padding={4}>
    <Button label="Hello Astryx" onPress={() => {}} />
  </VStack>
</Theme>
```

Dark mode is automatic — every token carries `[light, dark]` values and
`mode="system"` follows the OS.

Import from subpaths in real apps:

```tsx
import {Button} from 'react-native-astryx/Button';
```

<br/>

## ✦ Theming

Themes are plain objects. Override only what differs from the default.

```tsx
import {defineTheme, neutralTheme} from 'react-native-astryx';

const brand = defineTheme({
  name: 'brand',
  extends: neutralTheme,
  tokens: {
    '--color-accent': ['#7B61FF', '#9B85FF'], // [light, dark]
  },
});
```

Nest `<Theme>` anywhere in the tree to re-theme a subtree.

Read resolved values in JavaScript:

```tsx
const {tokens, mode} = useTheme();
tokens['--color-text-primary'];
```

<br/>

## ✦ Components

**107 components — full parity with upstream Astryx.**

Layout · Text · Buttons · Inputs · Cards · Lists · Tables · Dialogs ·
Sheets · Menus · Toasts · Navigation · Chat · i18n · hooks

Every component is importable via its own subpath:

```tsx
import {Card} from 'react-native-astryx/Card';
```

🤖 Using an AI coding agent? Point it at
[`AGENTS.md`](./AGENTS.md) — every component prop, token name, and
layout recipe, written for agents specifically.

<br/>

## ✦ Staying in sync with upstream

```bash
yarn sync    # live parity report against @astryxdesign/core
```

<br/>

## ✦ Development

```bash
yarn typecheck   # strict TS across lib + example
yarn lint        # eslint
yarn prepare     # compile src → lib
yarn example ios # showcase app (or android)
```

<br/>

## 🩺 Troubleshooting

**`Unexpected 'stylex.create' call at runtime`**

Your bundler resolved the package to source instead of the precompiled
build. Remove any custom export condition like
`react-native-astryx-source`, or add `@stylexjs/babel-plugin` to your
babel config:

```js
['@stylexjs/babel-plugin', {
  dev: false,
  runtimeInjection: false,
  importSources: [{from: 'react-strict-dom', as: 'css'}],
  styleResolution: 'property-specificity',
}]
```

<br/>

---

<div align="center">

### 🙏 Thank you, Meta & the Astryx team

The design language, token vocabulary, component APIs, and theme schema
all come from [**Astryx**](https://github.com/facebook/astryx) — eight years
of design-system engineering that Meta open-sourced under MIT.
This project only adapts their work to React Native.

Also powered by two more brilliant MIT Meta projects:
[react-strict-dom](https://github.com/facebook/react-strict-dom) ·
[StyleX](https://stylexjs.com)

Please ⭐ [the upstream repo](https://github.com/facebook/astryx).

Third-party notices: [`NOTICE`](./NOTICE)

<br/>

MIT © 2026 [SAM-AEL](https://github.com/SAM-AEL)

<br/>

</div>
