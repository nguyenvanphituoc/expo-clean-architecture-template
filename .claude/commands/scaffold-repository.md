Scaffold a repository layer for a feature in this project, including DI registration.

**Feature name:** $ARGUMENTS

---

## What to build

Create five files under `src/core/repositories/<feature>/` and wire DI. Derive:
- `<feature>` — camelCase (e.g. `logEntry`)
- `<Feature>` — PascalCase (e.g. `LogEntry`)
- DI token: `<feature>Repository` (e.g. `logEntryRepository`)

Assumes the domain model (`src/core/models/<feature>/`) already exists. Look at `src/core/repositories/user/` as a reference before writing.

---

## `interface.ts` — Repository Contract

Payload types consumed by use cases + the interface they depend on. Use cases import ONLY from here — they never touch `remote.ts` or `impl.ts`.

```ts
export interface Get<Feature>Payload {
  id: string
}

export interface Create<Feature>Payload {
  // fields needed to create the entity
}

export interface I<Feature>Repository {
  get(payload: Get<Feature>Payload): Promise<<Feature>>
  create(payload: Create<Feature>Payload): Promise<<Feature>>
  // add list, update, delete as needed
}
```

---

## `remote.ts` — HTTP Data Source

Calls the API via `handleAPIRequest`. Returns `Raw` types only — no entity mapping here.

```ts
import { handleAPIRequest } from '@/core/adapter'
import type { <Feature>Raw } from '@/core/models/<feature>'
import type { Get<Feature>Payload, Create<Feature>Payload } from './interface'

export class <Feature>Remote {
  async get(payload: Get<Feature>Payload): Promise<<Feature>Raw> {
    return handleAPIRequest(async (client) => {
      const response = await client.get(`/<feature>s/${payload.id}`)
      return response.data
    })
  }

  async create(payload: Create<Feature>Payload): Promise<<Feature>Raw> {
    return handleAPIRequest(async (client) => {
      const response = await client.post('/<feature>s', payload)
      return response.data
    })
  }
}
```

---

## `impl.ts` — Repository Implementation

Implements `I<Feature>Repository`. Calls remote, maps via `toEntity`. Constructor takes only `(remote: <Feature>Remote)` in the cloud-first phase.

```ts
import { toEntity } from '@/core/models/<feature>'
import type { <Feature> } from '@/core/models/<feature>'
import type { I<Feature>Repository, Get<Feature>Payload, Create<Feature>Payload } from './interface'
import type { <Feature>Remote } from './remote'

export class <Feature>RepositoryImpl implements I<Feature>Repository {
  constructor(private remote: <Feature>Remote) {}

  async get(payload: Get<Feature>Payload): Promise<<Feature>> {
    const raw = await this.remote.get(payload)
    return toEntity(raw)
  }

  async create(payload: Create<Feature>Payload): Promise<<Feature>> {
    const raw = await this.remote.create(payload)
    return toEntity(raw)
  }
}
```

---

## `factory.ts` — DI Registration

Wires dependencies and registers to the DI container. This file's import triggers auto-registration as a side effect.

```ts
import { defineDIModule } from '@/core/DI'
import { REGISTER_NAME } from '@/core/DI'
import { <Feature>Remote } from './remote'
import { <Feature>RepositoryImpl } from './impl'

export const register<Feature>Repository = defineDIModule(
  REGISTER_NAME.<feature>Repository,
  (container) => {
    const apiProvider = container.resolve(REGISTER_NAME.apiProvider)
    const remote = new <Feature>Remote(apiProvider)
    return new <Feature>RepositoryImpl(remote)
  }
)
```

---

## `index.ts` — Re-exports

```ts
export type { I<Feature>Repository, Get<Feature>Payload, Create<Feature>Payload } from './interface'
export { <Feature>RepositoryImpl } from './impl'
```

---

## Wire DI

**1. Add token to `REGISTER_NAME`** in `src/core/DI/` (find the `REGISTER_NAME` object and add):
```ts
<feature>Repository: '<feature>Repository',
```

**2. Import factory in `src/core/DI/register.ts`:**
```ts
import '@/core/repositories/<feature>/factory'
```

This import must be added — without it the factory side-effect never runs and the token is unresolvable at runtime.

---

## Checklist before finishing

- [ ] `remote.ts` returns `Raw` types only — no `toEntity` calls
- [ ] `impl.ts` calls `toEntity` — never maps inline
- [ ] `impl.ts` constructor takes only the remote (no db, no sync references in cloud-first phase)
- [ ] `factory.ts` uses `defineDIModule(REGISTER_NAME.<feature>Repository, ...)`
- [ ] Token added to `REGISTER_NAME` in `src/core/DI/`
- [ ] `factory.ts` imported in `src/core/DI/register.ts`
- [ ] `interface.ts` is the only file use cases will import from this folder
