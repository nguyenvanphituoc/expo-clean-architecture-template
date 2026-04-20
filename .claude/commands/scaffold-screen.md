Scaffold a new screen following the MVC UI pattern in this project.

**Screen name:** $ARGUMENTS

---

## What to build

Create three files under `src/ui/screens/<Name>/` and one route stub. Derive:
- `<Name>` — PascalCase screen name (e.g. `LogDetail`)
- `<name>` — camelCase for hook (e.g. `logDetail`)

Look at an existing screen (e.g. `src/ui/screens/Login/`) as a reference before writing.

---

## File 1 — `src/ui/screens/<Name>/en.json`

All display strings for this screen. No hardcoded strings anywhere in the screen — everything comes from here.

```json
{
  "title": "<Name>"
}
```

For multi-part sentences with interactive spans, use `{placeholder}` syntax:
```json
{ "prompt": "Don't have an account? {signUp}", "signUp": "Sign up" }
```

---

## File 2 — `src/ui/screens/<Name>/context.tsx`

The controller. Rules:
- Wrap subtree with a React context provider: `<Name>Provider`
- Export `use<Name>` hook that returns the viewModel directly (no wrapper object)
- Call RTK Query hooks from `src/core/api` here — no direct use case imports
- Resolve strings: `const localize = useStrings(strings)` where `strings` is the imported `en.json`
- Return `localize`, `control` (if form present), `actions`, and any UI state fields directly
- `actions` must include `onRefresh` that calls `syncAdapter.flush()` (not `refetch()`)

```tsx
const <Name>Context = createContext(...)

export function <Name>Provider({ children }: { children: React.ReactNode }) {
  const localize = useStrings(strings)
  // RTK Query hooks here
  const actions = {
    onRefresh: async () => { await syncAdapter.flush() },
    // other actions
  }
  return (
    <<Name>Context.Provider value={{ localize, actions }}>
      {children}
    </<Name>Context.Provider>
  )
}

export function use<Name>() {
  return useContext(<Name>Context)
}
```

---

## File 3 — `src/ui/screens/<Name>/index.tsx`

The view composer. Rules:
- Wrap layout with `<<Name>Provider>`
- Read viewModel via `use<Name>()`
- Use ONLY design-system primitives — never bare React Native:

| Banned | Use instead | Import |
|--------|------------|--------|
| `View` | `AppContainer` | `@/ui/views/themed/View` |
| `Text` | `AppText` | `@/ui/views/themed/Text` |
| `TextInput` | `AppTextInput` | `@/ui/views/themed/TextInput` |
| `Pressable` / `TouchableOpacity` | `PressableComponent` | `@/ui/views/Pressable` |
| `KeyboardAvoidingView` + `ScrollView` | `KeyboardComponent` | `@/ui/views/Keyboard` |
| `Button` | `AppButton` | `@/ui/views/themed/Button` |

- Prefer `AppContainer` shorthand props (`row`, `gap`, `align`, `justify`, `radius`, `color`) over `StyleSheet` entries
- Never import JSON locale files directly — use `localize` from the hook
- If the layout has distinct named sections, extract each into `src/ui/screens/<Name>/shared/<Name><Section>.tsx` as a pure function component

```tsx
export function <Name>Screen() {
  return (
    <<Name>Provider>
      <<Name>Content />
    </<Name>Provider>
  )
}

function <Name>Content() {
  const { localize, actions } = use<Name>()
  return (
    <AppContainer flex={1}>
      <AppText>{localize.title}</AppText>
    </AppContainer>
  )
}
```

---

## File 4 — Route stub

Create `src/app/(root)/(screens)/<name>.tsx` (adjust path to match existing route structure):

```tsx
import { <Name>Screen } from '@/ui/screens/<Name>'

export default function Route() {
  return <<Name>Screen />
}
```

The route file must contain ONLY this import and default export — no logic, no hooks, no DI access.

---

## `shared/` extraction rules

When `index.tsx` has named, distinct UI sections:
- Extract each into `src/ui/screens/<Name>/shared/<Name><Section>.tsx`
- Pure functions only — no context hooks, no RTK hooks, no data fetching
- Accept only the props they display — derive nothing from context themselves
- Handle null/empty case inside the component, return `null` when optional section is absent
- `index.tsx` remains the sole composer: reads from `use<Name>()` and passes data as props

---

## Checklist before finishing

- [ ] No bare `View`, `Text`, `Pressable`, `TouchableOpacity` in screen files
- [ ] No hardcoded strings — all copy in `en.json`, accessed via `localize`
- [ ] `onRefresh` calls `syncAdapter.flush()`, not `refetch()`
- [ ] Route file is a minimal stub (import + default export only)
- [ ] RTK Query hooks only in `context.tsx`, not in `index.tsx` or `shared/`
- [ ] `StyleSheet` used only when no corresponding shorthand prop exists on the component
