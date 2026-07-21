---
paths:
  - 'src/**/*.{ts,tsx}'
---

# Rule: Domain Types Extraction

Apply whenever a new domain/data `interface` or `type` is introduced: entities, DTOs, service inputs/outputs, API responses, session/user shapes, etc.

This rule does NOT apply to component prop types (e.g. `ButtonProps`, `NavProps`). Those stay colocated with their component file — this is about domain/data types only.

## Before creating a new type

1. Check `src/types/` for a file that already covers the same domain (e.g. `user.ts`, `auth.ts`). If one exists, add the interface there instead of creating a new file.
2. Check whether the type is already defined closer to its source of truth — a service file (`src/services/*.service.ts`) may already export the exact shape needed. Import and reuse it instead of redefining an equivalent type elsewhere.
3. Only create a new file under `src/types/` when no existing file fits the domain.

## When creating a new types file

- Location: `src/types/<domain>.ts` (e.g. `src/types/user.ts`, `src/types/auth.ts`).
- Name the file after the domain, not the feature/page that triggered it — domain types are meant to be reused across services, components, and pages.
- Group related interfaces/types for the same domain in the same file; don't create a new file per interface.
- Export named `interface`/`type`. Never `export default` a type.

## What stays out of `src/types/`

- Component prop types (`XxxProps`) — keep colocated with the component file.
- A type used by a single Server Action or a single page and never imported elsewhere — colocation still wins; promote it to `src/types/` only once a second consumer needs it.

## Checklist

- [ ] Checked `src/types/` for an existing file covering this domain before creating a new one.
- [ ] Checked `src/services/` / `src/lib/` for an existing equivalent type before duplicating it.
- [ ] New domain types placed in `src/types/<domain>.ts`, not inline in a component/page/service.
- [ ] Component prop types remain colocated, not moved to `src/types/`.
