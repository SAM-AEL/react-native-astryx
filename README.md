<div align="center">

<img src="https://img.shields.io/badge/⬡_ASTRYX_NATIVE-7B61FF?style=for-the-badge&labelColor=1B1B1B&logoWidth=20" alt="Astryx Native" />

# react-native-astryx

### The Astryx design system — rebuilt for React Native

[![npm version](https://img.shields.io/npm/v/react-native-astryx.svg?style=flat-square&color=7B61FF)](https://www.npmjs.com/package/react-native-astryx)
[![npm downloads](https://img.shields.io/npm/dm/react-native-astryx.svg?style=flat-square&color=2694FE)](https://www.npmjs.com/package/react-native-astryx)
[![license MIT](https://img.shields.io/badge/license-MIT-1D7A3E.svg?style=flat-square)](./LICENSE)
![React Native](https://img.shields.io/badge/React_Native-0.81+-61DAFB?style=flat-square&logo=react&logoColor=black)
![StyleX](https://img.shields.io/badge/powered_by-StyleX-FDA31C?style=flat-square)
![react-strict-dom](https://img.shields.io/badge/rendered_via-react--strict--dom-C8311B?style=flat-square)

**A spec-synced React Native port of [facebook/astryx](https://github.com/facebook/astryx)**
— Meta's open-source design system — with the same token names, the same
component APIs, and the same `defineTheme` schema. Written once for iOS and
Android on top of [`react-strict-dom`](https://github.com/facebook/react-strict-dom)
and [StyleX](https://stylexjs.com).

[Install](#-install) · [Usage](#-usage) · [Theming](#-theming) ·
[Components](#-component-coverage) · [Staying in sync](#-staying-in-sync-with-upstream)

</div>

---

## ✨ Why this exists

[Astryx](https://astryx.atmeta.com) is web-only (`react-dom`, CSS custom
properties, cascade layers). This package brings its **design language** to
native:

| | Upstream `@astryxdesign/core` | `react-native-astryx` |
|---|---|---|
| Platform | Web (DOM + CSS) | **iOS + Android** |
| Styling engine | StyleX → CSS classes | **StyleX via react-strict-dom** → native styles |
| Tokens | CSS custom properties | Same names, resolved through `<Theme>` context |
| Dark mode | `[light, dark]` tuples + media queries | Same tuples + `Appearance` |
| Theme schema | `defineTheme({...})` | **Identical schema**, incl. `extends` |
| Component API | `Button label variant size …` | **Mirrored 1:1** |
| Sync strategy | — | Drift harness (`yarn sync`) against upstream releases |

> 💡 **No consumer build config required.** Styles are compiled at library
> build time; your app needs zero babel/metro changes.

## 📦 Install

```bash
# npm
npm install react-native-astryx

# yarn
yarn add react-native-astryx

# pnpm
pnpm add react-native-astryx
```

Requires **React 19+** and **React Native 0.79.5+** (peer dependencies).
That's it — no stylex plugin, no PostCSS, no extra config.

## 🚀 Usage

Wrap your app in `<Theme>`, then use components anywhere:

```tsx
import {Theme, neutralTheme, VStack, Button, Text} from 'react-native-astryx';

function App() {
  return (
    <Theme theme={neutralTheme} mode="system">
      <VStack gap={4} padding={4}>
        <Text>Hello Astryx</Text>
        <Button label="Tap me" onPress={() => alert('Hi!')} />
      </VStack>
    </Theme>
  );
}
```

Import from subpaths to keep bundles small — same convention as upstream:

```tsx
import {Button} from 'react-native-astryx/Button';
import {Card} from 'react-native-astryx/Card';
import {useToast} from 'react-native-astryx/Toast';
```

## 🎨 Theming

Every color, spacing step, radius and type size is a **semantic token**
(`--color-text-primary`, `--spacing-4`, `--radius-element`, …) with a light
and dark value. Themes are plain objects created with `defineTheme` — the
same config format as upstream, so web themes port over almost verbatim:

```tsx
import {Theme, defineTheme} from 'react-native-astryx';

const brand = defineTheme({
  name: 'brand',
  extends: neutralTheme,           // inherit everything…
  tokens: {
    '--color-accent': ['#7B61FF', '#9B85FF'], // [light, dark]
  },
});

<Theme theme={brand}>
  {/* your app — accent is now purple, light AND dark */}
</Theme>
```

```tsx
// Color modes: follow the OS, or control it yourself
<Theme theme={brand} mode="system" />   // default — tracks Appearance
<Theme theme={brand} mode="dark" />     // forced dark section
<Theme theme={light}><Feed /></Theme>
<Theme theme={dark}><Sidebar /></Theme> // nesting works per-section
```

Reading resolved values in JavaScript (charts, maps, third-party configs):

```tsx
const {tokens, mode} = useTheme();
tokens['--color-text-primary']; // concrete value for the active mode
```

## 🧩 Component coverage

53 components shipped across every category — run `yarn sync` anytime for a
live report against upstream.

<div align="left">

| Category | Components |
|---|---|
| **Layout** | `VStack` · `HStack` · `Stack` · `Center` · `Divider` · `Section` · `AspectRatio` |
| **Content** | `Text` · `Heading` · `Icon` · `Avatar` · `AvatarGroup` · `Kbd` · `Timestamp` |
| **Containers** | `Card` · `ClickableCard` · `SelectableCard` |
| **Action** | `Button` · `IconButton` · `ToggleButton` · `ButtonGroup` · `SegmentedControl` |
| **Inputs** | `TextInput` · `TextArea` · `NumberInput` · `Switch` · `CheckboxInput` · `RadioList` · `Slider` · `Selector` · `Typeahead` · `Calendar` · `DateInput` · `Field` |
| **Feedback** | `Badge` · `Banner` · `StatusDot` · `Spinner` · `ProgressBar` · `Skeleton` · `EmptyState` · `Toast` |
| **Overlays** | `Dialog` · `BottomSheet` |
| **Navigation** | `TabList` · `List`/`ListItem` · `Breadcrumbs` · `Stepper` · `Pagination` |
| **Data** | `Table` |
| **Utilities** | `VisuallyHidden` |

</div>

Native adaptations (documented, never silent): hover/focus states become
Pressable pressed states, tooltips become long-press patterns, dialogs and
sheets use the platform `Modal`.

## 🔄 Staying in sync with upstream

This package treats [`@astryxdesign/core`](https://github.com/facebook/astryx)
as a living spec rather than copying it blindly:

```bash
yarn sync                        # compare against latest upstream release
ASTRYX_VERSION=0.5.0 yarn sync   # compare against a pinned version
yarn sync --json report.json     # machine-readable output
```

The harness downloads the published upstream package, extracts each
component's public surface from its declarations, and reports coverage,
missing ports, and native-only additions.

## 🏃 Run the example

A full showcase app lives in [`example/`](./example) — every component, plus
live theme switching (neutral ↔ brand) and light/dark toggling:

```bash
yarn                              # install at repo root
yarn example ios                  # or: yarn example android
```

## 🛠️ Development

```bash
yarn typecheck   # strict TypeScript across lib + example
yarn lint        # eslint (0 errors policy)
yarn prepare     # compile src → lib (babel + StyleX + tsc defs)
yarn sync        # upstream drift report
```

```
src/
├── {Component}/         # one directory per component, index.ts entry
│    └── index.ts        #    mirrors upstream's packages/core/src layout
├── theme/               # Theme provider, defineTheme, token tables
├── internal/elements.tsx# typed element layer over react-strict-dom
└── index.tsx            # root barrel
scripts/sync/            # drift-detection harness
example/                 # Expo showcase app
```

## 🗺️ Roadmap

- [ ] Remaining upstream components (54 tracked by `yarn sync` — Chat suite, CommandPalette, DropdownMenu, Popover, Tooltip, TopNav/SideNav adaptations…)
- [ ] Per-component `.doc.mjs` documentation files matching upstream's format
- [ ] Universal web export (components already author RSD styles; web runtime is a build target away)
- [ ] Codemods for upstream theme migration

## 📜 Credits & license

<div align="center">

### 🙏 Massive thanks to Meta and the Astryx team

[**Astryx**](https://github.com/facebook/astryx) is Meta's open-source design
system, released under the MIT license. This project exists because they
open-sourced eight years of design-system engineering: the design language,
the semantic token vocabulary, the component APIs, and the `defineTheme`
schema all originate from Astryx. **All credit for the design system itself
belongs to [Meta Platforms, Inc.](https://opensource.fb.com) and the Astryx
contributors** — this repository only adapts their work to React Native.

Also built on two more excellent MIT-licensed Meta projects:
[react-strict-dom](https://github.com/facebook/react-strict-dom) and
[StyleX](https://stylexjs.com). Please ⭐ [the upstream repo](https://github.com/facebook/astryx)
— it deserves it.

</div>

Third-party notices are collected in [`NOTICE`](./NOTICE).

MIT © 2026 [SAM-AEL](https://github.com/SAM-AEL)

<div align="center">

**If this saves you months of UI work, consider giving it a ⭐**

</div>
