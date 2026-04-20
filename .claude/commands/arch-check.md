Review the specified files or feature against this project's architecture guardrails and report violations.

**Target (file, folder, or feature name):** $ARGUMENTS

---

## What to check

Read the target files, then verify every rule below. Report each section with ✅ PASS, ⚠️ WARNING, or ❌ VIOLATION. For violations, quote the offending line and explain the fix.

---

## 1. Layer Isolation

- No file in `src/ui/` imports from `src/core/repositories/` or `src/core/useCases/` directly
- No file in `src/ui/` imports from route files (`src/app/`)
- No `context.tsx` imports use case factories directly — RTK Query hooks only
- Use cases import from `interface.ts` only — never from `remote.ts` or `impl.ts`
- Route files contain only: one Screen import + default export — zero logic

## 2. Domain Layer

- Every `raw.ts` uses `z.looseObject(...)` (not `z.object`)
- All fields in `raw.ts` are `.nullish()`
- `dto.ts` `toEntity` never throws — every field has `?? default` or fallback
- `dto.ts` functions are pure (no side effects, no imports from `base.ts` rules)
- `rules.ts` exports factory functions, not top-level validators with global mutable state
- `base.ts` is the single source of truth — consumers import type from here, not from `raw.ts`

## 3. Repository Layer

- `impl.ts` constructor takes only `(db: Database)` — no remote, no sync queue references
- `remote.ts` returns `Raw` types — no entity mapping
- `impl.ts` maps raw → entity via `toEntity` from dto
- `factory.ts` calls `defineDIModule(REGISTER_NAME.<feature>Repository, ...)`
- `factory.ts` is imported in `src/core/DI/register.ts`

## 4. Use Case Layer

- Every use case file has all six required parts: `dependencyMap`, `create` fn, `KEY` const, `registerXxx`, `IXxx` interface, `declare module '@/core/DI'`
- `declare module '@/core/DI'` block is present and extends `USE_CASES_MAP`
- Use case file is imported at app startup (via its API slice file)

## 5. DI Completeness

- Feature's token exists in `REGISTER_NAME` in `src/core/DI/`
- `factory.ts` import is present in `src/core/DI/register.ts`
- API reducer registered in Redux store reducer map
- API middleware registered in Redux store middleware chain
- If feature has sync: all four SyncTarget handlers registered (`push`, `afterPush`, `pull`, `upsert`)

## 6. UI / Presentation Guardrails

- No bare `View`, `Text`, `TextInput`, `Pressable`, `TouchableOpacity`, `KeyboardAvoidingView` in screen or component files — use design-system equivalents
- No hardcoded strings in views — all copy in `en.json`, accessed via `localize`
- No multi-part sentences built via string concatenation — use `{placeholder}` template + `t()` interpolation
- RTK Query hooks only in `context.tsx`, never in `index.tsx`, `shared/`, or `components/`
- `StyleSheet` used only when no shorthand prop exists on the design-system component
- `onRefresh` calls `syncAdapter.flush()`, not `refetch()`
- `shared/` components are pure functions — no context hooks, no data fetching

## 7. API Slice

- Uses `builder.query` for reads, `builder.mutation` for writes
- `query` fn returns `{ useCaseKey, payload }` — no direct logic
- Use case files imported at the top of the API slice file

---

## Output format

```
## 1. Layer Isolation
✅ No cross-layer imports found

## 2. Domain Layer
❌ VIOLATION — src/core/models/logEntry/raw.ts:3
  Uses `z.object` instead of `z.looseObject`.
  Fix: change to `z.looseObject({ ... })` to preserve unknown remote fields.

## 3. Repository Layer
✅ All clear
...
```

End with a **Summary** count: X violations, Y warnings, Z passed.
