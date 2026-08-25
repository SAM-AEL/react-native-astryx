# AGENTS.md — react-native-astryx

Reference for AI coding agents building React Native apps with this design
system. Follow these conventions exactly; they mirror upstream Astryx
(https://github.com/facebook/astryx) and are enforced by the package's API.

## 1. Non-negotiable rules

1. **Wrap the app in `<Theme>` once**, at the root, before rendering any
   component. Components throw without it (`useTheme` requires context).
   Wrap in `<ToastProvider>` too if using toasts.
2. **Controlled inputs only.** Every input takes `value` + `onChange`
   (or `checked` + `onCheckedChange`, etc.). Never expect uncontrolled state.
3. **Semantic tokens, never hardcoded values.** No `#FFF`, no `16` px magic
   numbers in your own styles when a token exists. Read values via
   `useTheme().tokens['--color-text-primary']`.
4. **Use components over primitives.** Reach for `Text`, `Button`, `Card`,
   `List`… before React Native's `View`/`Text`/`Pressable`. Raw RN `View`
   is acceptable only for layout glue and app-specific containers.
5. **Dense data renders as rows** (`List`/`ListItem`, `Table`). `Card` is
   for widgets, galleries, and settings groups — never wrap every row of
   data in a `Card`.
6. **Don't invent props.** If a prop isn't documented below, it doesn't
   exist. Check the TypeScript types in `lib/typescript/src/<Name>/`.
7. **Style overrides go through `xstyle`.** Accepts a plain style object,
   an array, or styles from `css.create()`. Later entries win.
8. **Import from subpaths** in production code:
   `import {Button} from 'react-native-astryx/Button'`. The root barrel
   (`react-native-astryx`) is fine for prototypes.

## 2. Minimum setup

```tsx
import {Theme, neutralTheme} from 'react-native-astryx';

// App root — mode="system" tracks OS dark mode automatically.
<Theme theme={neutralTheme} mode="system">
  <App />
</Theme>
```

Dark mode needs zero extra work: every token carries `[light, dark]` values
resolved by `<Theme>`. To toggle manually, own `'light' | 'dark'` state at
the app level and pass it to `mode`.

## 3. Theming

```tsx
import {defineTheme} from 'react-native-astryx';

const brand = defineTheme({
  name: 'brand',
  extends: neutralTheme,              // inherit all defaults…
  color: {accent: '#7B61FF'},         // …then re-seed accent
  typography: {scale: {base: 15, ratio: 1.2}},
  radius: {multiplier: 1.25},
  tokens: {                           // explicit overrides win last
    '--color-accent': ['#7B61FF', '#9B85FF'], // [light, dark] tuple
    '--color-background-body': ['#FFFFFF', '#0A0A0A'],
  },
});
```

- Accent re-seeds derived tokens (`--color-accent-muted`,
  `--color-text-accent`) automatically.
- Themes **nest**: `<Theme theme={dark}><Sidebar/></Theme>` inside a light
  tree themes just that subtree.
- Reading resolved values in JS: `const {tokens, mode} = useTheme();`
  → `tokens['--color-text-primary']`.

### Token families

| Family | Names |
|---|---|
| Background | `--color-background-body` `surface` `surface-hover` `inset` `inverse` |
| Text | `--color-text-primary` `secondary` `tertiary` `inverse` `accent` `success` `warning` `critical` |
| Accent/status fills | `--color-accent` `-muted` `--color-on-accent`, `--color-success/-warning/-critical` + `-muted` |
| Border | `--color-border` `border-strong` `focus` `overlay` |
| Spacing | `--spacing-{0,025,05,1,2,3,4,5,6,8,10,12,16,20}` (dp) |
| Radius | `--radius-inner` `element` `container` `page` `chat` `full` |
| Type | `--text-heading-{1..4}-size/weight`, `--text-body-size`, `--text-caption-size`, `--font-family-body/heading/code` |

Numeric props like `gap={4}` on stacks resolve through spacing tokens first.

## 4. Component quick reference

Signature notes only; all components also accept `testID?: string` and
`xstyle?: unknown`.

### Layout
| Component | Key props |
|---|---|
| `VStack` / `HStack` / `Stack` | `gap` (number→token), `align` (`start\|center\|end\|stretch\|baseline`), `justify` (`start…space-evenly`), `padding`, `grow`; `Stack` adds `direction` |
| `Center` | `grow` — fills parent and centers child |
| `Divider` | `vertical`, `inset` |
| `Section` | `title`, children — titled content region |
| `AspectRatio` | `ratio` (e.g. `16/9`) |

### Content
| Component | Key props |
|---|---|
| `Text` | `children`, `color` (`primary\|secondary\|tertiary\|inverse\|accent\|success\|warning\|critical`), `weight` (`regular\|medium\|semibold\|bold`), `mono`, `size`, `align`, `numberOfLines`, `selectable` |
| `Heading` | `level` (1–4, required-ish default 3), `color`, `align` |
| `Icon` | `name` from `GLYPHS` (check/close/chevron*/search/plus/info/warning/error/calendar/star/heart/settings/user/bell/home/trash), `size` (`xs\|sm\|md\|lg`), `color` |
| `Avatar` | `src` or `initials`, `size` (`xs\|sm\|md\|lg`) |
| `AvatarGroup` | `avatars: {src?, initials?}[]`, `max`, `size` |
| `Timestamp` | `date: Date\|number\|string`, optional `format` (Intl options) |
| `Kbd` | `children: string` |

### Containers
| Component | Key props |
|---|---|
| `Card` | `padding` (token number), `elevated` |
| `ClickableCard` | `onPress`, `disabled` |
| `SelectableCard` | `selected`, `onPress`, `disabled` |

### Action
| Component | Key props |
|---|---|
| `Button` | **`label`** (string, primary prop), `variant` (`primary\|secondary\|ghost\|destructive`), `size` (`sm\|md\|lg`), `onPress`, `disabled`, `loading`, `icon` (glyph string), `block` |
| `IconButton` | `icon`, **`accessibilityLabel` (required)**, `variant` (`secondary\|ghost`), `size`, `onPress` |
| `ToggleButton` | `label`, **`selected`** (controlled), `onChange(next: boolean)` |
| `ButtonGroup` | wraps sibling Buttons into one control |
| `SegmentedControl` | `items: {label,value,disabled?}[]`, **`value`**, `onChange(value)` |

### Inputs (all controlled)
| Component | Controlled pair | Extras |
|---|---|---|
| `TextInput` | `value`, `onChange(text)` | `placeholder`, `secureTextEntry`, `invalid`, `disabled`, `onSubmitEditing` |
| `TextArea` | `value`, `onChange(text)` | `minRows`, `maxLength`, `invalid` |
| `NumberInput` | `value: number \| null`, `onChange(n)` | `min`, `max`, `step` |
| `Switch` | `checked`, `onCheckedChange(b)` | `disabled` |
| `CheckboxInput` | `checked`, `onCheckedChange(b)` | `label` |
| `RadioList` | `value: string \| null`, `onChange(v)` | `items: {label,value,disabled?}[]` |
| `Slider` | `value`, `onChange(n)` | `min`, `max`, `step` |
| `Selector` | `value: string \| null`, `onChange(v)` | `options`, `placeholder`, `label` — opens native bottom sheet |
| `Typeahead` | local query state internal; `onChange(item)` | `options`, `minChars` — client-side filter |
| `Calendar` | `value: Date \| null`, `onChange(d)` | `month` |
| `DateInput` | `value: Date \| null`, `onChange(d)` | `label`, `placeholder` — Calendar in a sheet |

### Field wrapper (labels every input)
```tsx
<Field label="Email" status="We'll never share it." statusError={false}>
  <TextInput value={v} onChange={setV} />
</Field>
```

### Feedback & status
| Component | Key props |
|---|---|
| `Badge` | `label`, `color` (`neutral\|accent\|success\|warning\|critical`), `filled` — counts/enumerated states ONLY, not decoration |
| `StatusDot` | `color`, `size` — use instead of decorative Badges |
| `Banner` | `title`, `description`, `status`, `badge`, `actionLabel`+`onActionPress` |
| `Spinner` | `size`, `accent` |
| `ProgressBar` | `value` (omit → indeterminate), `max=1`, `color` |
| `Skeleton` | `shape` (`text\|rect\|circle`), `width`, `height`, `size` |
| `EmptyState` | `glyph`, `title`, `description`, `actionLabel`+`onActionPress` |
| `useToast()` | `{showToast({message, duration?, color?})}` — requires `<ToastProvider>` above |

### Overlays (both controlled via `visible`)
| Component | Key props |
|---|---|
| `Dialog` | `visible`, `onDismiss`, `title`, `footer` (Buttons), platform `Modal` |
| `BottomSheet` | `visible`, `onDismiss`, `title`, `heightFraction` |

### Navigation
| Component | Key props |
|---|---|
| `TabList` | `items`, **`value`**, `onChange` — switch content yourself |
| `List` / `ListItem` | ListItem: `label`, `description`, `leading`, `trailing`, `onPress` |
| `Breadcrumbs` | `items: {label, onPress?}[]` (last item static) |
| `Stepper` | `steps: {label, description?}[]`, `current` (zero-based) |
| `Pagination` | `page` (1-based), `pageCount`, `onPageChange` |

### Data
| Component | Key props |
|---|---|
| `Table<Row>` | `columns: {key,label,width?,align?,render?(row)}[]`, `rows`, `getRowKey`, `onRowPress` — horizontal scroll built in |
| `MetadataList` | `items: {label,value}[]` — key/value detail rows |
| `TreeList` | `nodes: {label,value,children?}[]`, **`value`**, `onChange` — expandable hierarchy |
| `Carousel` | children in a horizontal snap strip |
| `OverflowList` | `items: ReactNode[]`, `max` — renders first N + "+N" |
| `Collapsible` / `CollapsibleGroup` | `title`, `open`(controlled)/`defaultOpen`, `onOpenChange`; Group takes `sections` |
| `Resizable` | `start`, `end`, `initialSplit`, `onSplitChange` |

### Overlays (extended)
| Component | Key props |
|---|---|
| `AlertDialog` | `visible`, `onDismiss`, `title`, `description`, `confirmLabel`, `destructive`, `onConfirm` — blocks outside taps |
| `Popover` | `visible`, `onDismiss` — small floating card (no anchor positioning) |
| `DropdownMenu` | `items: {label,onPress,icon?,destructive?}[]`, render-prop trigger `children(open)` — bottom action sheet |
| `MoreMenu` | `items` — "⋯" IconButton prewired to DropdownMenu |
| `ContextMenu` | same API as DropdownMenu; wrap your own long-press gesture |
| `Tooltip` | `label`, press-and-hold to reveal |
| `HoverCard` | `content`, long-press trigger shows Card preview |
| `Lightbox` | `visible`, `onDismiss`, `src`, `alt` — fullscreen image viewer |
| `Overlay` | `visible`, `onDismiss` — dimmed layer for custom floats |
| `CommandPalette` | `items: {label,value,group?,onPress}[]`, `visible`, `onDismiss` — sheet-based ⌘K |
| `PowerSearch<T>` | generic; `results`, `searchText(item)`, `renderItem`, `visible`, `onDismiss` |

### Navigation & shells (extended)
| Component | Key props |
|---|---|
| `Layout` | `header`, `start`, `content`, `footer` — frame-first page scaffold; pair with `LayoutHeader/Content/Footer/Panel` |
| `AppShell` | `header`, `content`, `tabs: MobileNavItem[]`, `activeTab`, `onTabChange` — mobile screen shell |
| `MobileNav` | `items: {value,icon,label,badge?}[]`, **`value`**, `onChange` — bottom tab bar |
| `TopNav` | `title`, `items?`, `value`, `onItemPress`, `actions`, `leading` |
| `SideNav` | `sections: {heading?,items}[]`, **`value`**, `onItemPress` — for drawers/Layout.start |
| `NavIcon` / `NavMenu` / `Outline` | NavIcon: `icon`, `accessibilityLabel`, `selected`, `badge`; NavMenu: `entries`; Outline: `items: {label,onPress,depth?}` |

### Chat
| Component | Key props |
|---|---|
| `ChatMessage` | `author: {name,avatar?}`, `body`, `outgoing`, `createdAt` |
| `ChatSystemMessage` | centered event line |
| `ChatComposer` | `value`, `onChange`, `onSend`, `disabled` |
| `ChatMessageList` | flex container for message rows |

### Content (extended)
| Component | Key props |
|---|---|
| `Blockquote` | `cite` attribution line |
| `Citation` | `author`, `authorAvatar`, `source` |
| `Code` / `CodeBlock` | CodeBlock: `code`, `language?`, `copyable` (uses react-native Clipboard if present) |
| `Markdown` | basic subset only: #/##/### headings, `-` lists, paragraphs, `**bold**`, `` `code` `` |
| `Thumbnail` | `src`, `size` |
| `Timestamp` | see Content above |

### Inputs (extended)
| Component | Key props |
|---|---|
| `CheckboxList` | `items`, `value: string[]`, `onChange(values)` |
| `MultiSelector` | `options`, `value: string[]`, `onChange`, draft-confirm sheet |
| `ComplexSelector` | options with `description`; inline radio-style cards |
| `Tokenizer` | `value: string[]`, `onChange`, tokens + input |
| `FileInput` | picker is delegated via `onPickRequest` — wire to expo-document-picker etc. |
| `TimeInput` | `value: 'HH:mm' \| null`, stepper UI |
| `DateTimeInput` / `DateRangeInput` | compose Calendar/DateInput/TimeInput; range uses two-tap flow |

### Primitives, contexts & i18n
| Export | Purpose |
|---|---|
| `FieldStatus` | re-export of Field's status line |
| `Item` | lowest-level row primitive (leading/content/trailing) |
| `CheckboxIndicator` / `RadioIndicator` | bare visuals for custom controls |
| `InteractiveRoleProvider` / `SizeProvider` / `LayerProvider` | role announcement; density multiplier; overlay tracking (`useLayer(id)`) |
| `InternationalizationProvider` / `useLocale` / `useNumberFormatter` / `createTranslator` | locale context + dictionary `t('a.b')` |
| `hooks` subpath | `useDebouncedCallback`, `usePrevious`, `useToggle` |

### Utilities
`VisuallyHidden` — screen-reader-only wrapper.

## 5. Proven page recipes

### Form screen
```tsx
<VStack gap={4}>
  <Field label="Name"><TextInput value={n} onChange={setN} /></Field>
  <Field label="Plan" status={err && 'Required'} statusError={!!err}>
    <Selector options={plans} value={plan} onChange={setPlan} />
  </Field>
  <HStack gap={4}><Switch checked={s} onCheckedChange={setS} />
    <CheckboxInput label="Notify me" checked={c} onCheckedChange={setC} /></HStack>
  <Button label="Save" block onPress={save} loading={saving} />
</VStack>
```

### List/detail screen
```tsx
<VStack gap={0}>
  <Breadcrumbs items={[{label:'Home',onPress}, {label:'Items'}]} />
  <List>
    {rows.map(r => (
      <ListItem key={r.id} label={r.name} description={r.role}
        leading={<Avatar initials={r.initials} />}
        trailing={<StatusDot color={r.online ? 'success' : 'neutral'} />}
        onPress={() => open(r.id)} />
    ))}
  </List>
</VStack>
```

### Loading → content → empty
Render `Skeleton` blocks while loading; `EmptyState` when the collection
is empty; real content otherwise. Never render nothing.

## 6. Anti-patterns (fail code review)

- ❌ Hex colors or hardcoded dp where a token exists
- ❌ Uncontrolled inputs, or mutating `value` without an `onChange` owner
- ❌ `Badge` used decoratively (use `StatusDot`)
- ❌ Cards around dense data rows
- ❌ Props that aren't in section 4 ("invented props")
- ❌ Rendering Astryx components outside `<Theme>`
- ❌ `Alert.alert` for confirmations (use `Dialog`)
- ❌ Forgetting `accessibilityLabel` on `IconButton`

## 7. Environment facts

- Peer requirements: `react >=19`, `react-native >=0.79.5`.
- Zero consumer build config: no babel/metro changes needed. The published
  package resolves to precompiled styles (`lib/module`). Only add a custom
  export condition such as `react-native-astryx-source` if you also add
  `@stylexjs/babel-plugin` (`importSources: [{from:'react-strict-dom',as:'css'}]`)
  to the app's babel config; otherwise you will hit
  "Unexpected 'stylex.create' call at runtime".
- iOS + Android today; web export is on the roadmap — don't rely on DOM APIs.
- Styling engine is react-strict-dom/StyleX, precompiled. If you author
  custom `xstyle` styles, `css.create` comes from `react-strict-dom`
  (`import {css} from 'react-strict-dom'`); plain style objects are also
  valid and merge after component defaults.
- Run `yarn sync` in this repo to compare coverage against upstream
  @astryxdesign/core releases before assuming a component exists.
