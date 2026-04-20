Scaffold a domain model layer for a new entity in this project.

**Entity name:** $ARGUMENTS

---

## What to build

Create five files under `src/core/models/<entity>/`. Derive:
- `<entity>` — camelCase folder name (e.g. `logEntry`)
- `<Entity>` — PascalCase (e.g. `LogEntry`)

Look at `src/core/models/user/` as a reference before writing.

---

## `base.ts` — Canonical Entity

The single source of truth for what a valid entity looks like in this app. All consumers (repositories, use cases, UI selectors) import the type from here.

```ts
import { z } from 'zod'

export const <Entity>Schema = z.object({
  id: z.string(),
  // add fields based on the entity
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type <Entity> = z.infer<typeof <Entity>Schema>

export function parse<Entity>(data: unknown): <Entity> {
  return <Entity>Schema.parse(data)
}
```

---

## `raw.ts` — Gateway Representation

Mirrors the API/storage shape before normalisation. Rules:
- Use `z.looseObject(...)` — never `z.object` — to preserve unknown remote fields
- Every field must be `.nullish()` — repositories trust parsing without guessing optionality

```ts
import { z } from 'zod'

export const <Entity>RawSchema = z.looseObject({
  id: z.string().nullish(),
  // mirror all known API fields as nullish
  created_at: z.string().nullish(),
  updated_at: z.string().nullish(),
})

export type <Entity>Raw = z.infer<typeof <Entity>RawSchema>
```

---

## `dto.ts` — Transformation Helpers

Pure functions converting between raw and canonical. Rules:
- `toEntity` must **never throw** — apply `?? default` to every field
- `fromEntity` converts back to wire format for create/update payloads

```ts
import type { <Entity> } from './base'
import type { <Entity>Raw } from './raw'

export function toEntity(raw: <Entity>Raw): <Entity> {
  return {
    id: raw.id ?? '',
    // map and apply defaults for every field
    createdAt: raw.created_at ?? '',
    updatedAt: raw.updated_at ?? '',
  }
}

export function fromEntity(entity: <Entity>): Partial<<Entity>Raw> {
  return {
    id: entity.id,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
  }
}
```

---

## `rules.ts` — Business Constraints

Contextual validation on top of the base schema. Export factory functions — no global mutable state.

```ts
import { z } from 'zod'
import { <Entity>Schema } from './base'

export function create<Entity>Validator(ctx: { existingIds?: string[] }) {
  return <Entity>Schema.superRefine((entity, refineCtx) => {
    // add business constraints here
    // e.g. uniqueness, permission checks, etc.
  })
}

export function parse<Entity>WithRules(
  entity: unknown,
  ctx: Parameters<typeof create<Entity>Validator>[0]
) {
  return create<Entity>Validator(ctx).parse(entity)
}
```

If any constraint needs a DB lookup or network call, add:
```ts
export async function parse<Entity>Async(
  entity: unknown,
  deps: { /* injectable deps */ }
) {
  // use superRefineAsync here
}
```

---

## `index.ts` — Curated Exports

```ts
export type { <Entity> } from './base'
export { <Entity>Schema, parse<Entity> } from './base'
export type { <Entity>Raw } from './raw'
export { <Entity>RawSchema } from './raw'
export { toEntity, fromEntity } from './dto'
export { create<Entity>Validator, parse<Entity>WithRules } from './rules'
```

---

## Checklist before finishing

- [ ] `raw.ts` uses `z.looseObject` (not `z.object`)
- [ ] All fields in `raw.ts` are `.nullish()`
- [ ] `toEntity` in `dto.ts` never throws — every field has `?? default`
- [ ] `rules.ts` exports factory functions, not top-level validators
- [ ] `index.ts` re-exports everything needed by repository and use case layers
- [ ] `base.ts` is the only file defining the canonical entity type
