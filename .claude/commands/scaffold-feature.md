Scaffold a complete new feature following the cloud-first architecture in this project.

**Feature name:** $ARGUMENTS

---

## What to build

Create every file in the pipeline below. Use the feature name to derive:
- `<feature>` — camelCase folder/token name (e.g. `logEntry`)
- `<Feature>` — PascalCase (e.g. `LogEntry`)
- `REGISTER_NAME token` — `<feature>Repository` (e.g. `logEntryRepository`)

Look at `src/core/models/user/` and `src/core/repositories/user/` as reference implementations before writing anything.

---

## Step 1 — Domain Model `src/core/models/<feature>/`

**`base.ts`**
- Zod schema: `<Feature>Schema = z.object({ ... })`
- TypeScript type inferred from schema: `export type <Feature> = z.infer<typeof <Feature>Schema>`
- Parse helper: `export function parse<Feature>(data: unknown): <Feature> { return <Feature>Schema.parse(data) }`

**`raw.ts`**
- Use `z.looseObject({ ... })` — every field `.nullish()`
- Export `<Feature>RawSchema` and `<Feature>Raw` type
- Never use `z.object` here — use `z.looseObject` to preserve unknown remote fields

**`dto.ts`**
- `export function toEntity(raw: <Feature>Raw): <Feature>` — maps raw → canonical, never throws, applies `?? default` to every field
- `export function fromEntity(entity: <Feature>): Partial<<Feature>Raw>` — converts back to wire format for create/update payloads

**`index.ts`**
- Re-export everything from base, raw, dto

---

## Step 2 — Repository `src/core/repositories/<feature>/`

**`interface.ts`**
- Payload types (e.g. `Get<Feature>Payload`, `Create<Feature>Payload`)
- `export interface I<Feature>Repository { ... }` — methods use payload types, return `Promise<<Feature>>` or `Promise<<Feature>[]>`

**`remote.ts`**
- Import `handleAPIRequest` from the adapter layer
- Each method calls `handleAPIRequest(...)` and returns the `<Feature>Raw` type
- No entity mapping here — returns raw only

**`impl.ts`**
- Implements `I<Feature>Repository`
- Each method: calls `remote.<method>`, then maps result with `toEntity(raw)` from dto
- Constructor: `constructor(private remote: <Feature>Remote) {}`

**`factory.ts`**
- Calls `defineDIModule(REGISTER_NAME.<feature>Repository, container => { ... })`
- Resolves `capsu_api_provider` from container, constructs `<Feature>Remote`, constructs `<Feature>RepositoryImpl`
- This auto-registers on import — must be imported in `src/core/DI/register.ts`

**`index.ts`**
- Re-exports interface types and impl class

---

## Step 3 — Use Case `src/core/useCases/<feature>/<action>UseCase.ts`

Every use case file must have exactly these six parts in order:

```ts
// 1. dependencyMap
const dependencyMap = { <feature>Repository: REGISTER_NAME.<feature>Repository }

// 2. create factory
function create<Action>UseCase(deps) { return async (payload) => { ... } }

// 3. key constant
export const <ACTION>_USE_CASE_KEY = '<feature>/<action>'

// 4. register (side-effect — auto-pushes into DEFAULT_DI_REGISTRARS)
export const register<Action>UseCase = defineUseCase({
  key: <ACTION>_USE_CASE_KEY,
  dependencyMap,
  create: create<Action>UseCase,
})

// 5. interface
export interface I<Action>UseCase { [<ACTION>_USE_CASE_KEY]: ReturnType<typeof create<Action>UseCase> }

// 6. declare module — MANDATORY for DI type safety
declare module '@/core/DI' {
  interface USE_CASES_MAP extends I<Action>UseCase {}
}
```

---

## Step 4 — API Slice `src/core/api/<feature>.api.ts`

- Import all use case files at the top (triggers `declare module` side-effects)
- Use `builder.query` for reads, `builder.mutation` for writes
- Each endpoint: `query: (payload) => ({ useCaseKey: <ACTION>_USE_CASE_KEY, payload })`
- Export generated hooks: `use<Feature>Query`, `use<Action>Mutation`

---

## Step 5 — Wire DI + Redux

1. Add `<feature>Repository: '<feature>Repository'` to `REGISTER_NAME` in `src/core/DI/`
2. Add `import '@/core/repositories/<feature>/factory'` to `src/core/DI/register.ts`
3. Add the new `createApi` reducer to `src/core/store` reducer map
4. Add the new `createApi` middleware to the store middleware chain

---

## Checklist before finishing

- [ ] `raw.ts` uses `z.looseObject` (not `z.object`)
- [ ] `dto.ts` `toEntity` never throws — all fields have `?? default`
- [ ] `factory.ts` imported in `register.ts`
- [ ] `REGISTER_NAME` token added
- [ ] `declare module '@/core/DI'` block present in every use case file
- [ ] API reducer + middleware registered in Redux store
- [ ] Use case file imported by API slice (so side-effect runs at startup)
