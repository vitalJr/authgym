---
paths:
  - 'app/**/*.{ts,tsx}'
  - 'src/app/**/*.{ts,tsx}'
---

# Rules: Page Creation — Next.js (App Router) + React

Apply these rules when creating or editing any route inside `app/`.

## Stack and context

- Next.js with **App Router** (`app/`), React, TypeScript.
- Server Components by default; client-side JavaScript is minimized as much as possible.
- Absolute imports via the `@/` alias (configured in `tsconfig.json`).

## Route structure

- A route only exists if it has a `page.tsx` (or `route.ts` for APIs). The folder name is the URL segment.
- Use `_folder` (underscore) for code colocated with a route that must NOT become a route (`_components`, `_lib`).
- Use `(group)` to organize routes without affecting the URL (route groups).
- Colocation: what's used by a single route stays with it; shared code moves up to `@/components`, `@/lib`, `@/hooks`.
- API endpoints use `route.ts`, never `page.tsx`.

## Server vs Client Components

- **Server Component is the default.** Do NOT add `'use client'` unless necessary.
- Add `'use client'` ONLY when the component needs: `useState`/`useEffect`/state hooks, event handlers (`onClick`, `onChange`), or browser APIs (`window`, `localStorage`).
- Keep `'use client'` at the **leaves** of the tree. Pages and layouts stay Server Components; isolate interactivity in small components ("client islands").
- Client Components do NOT import Server Components directly — pass them as `children`/props.
- Never put `'use client'` at the top of `layout.tsx` or `page.tsx`.

## Data fetching

- The project uses **axios**, not native `fetch`. NEVER call `fetch(...)` directly in a page or component.
- Fetch data on the server, inside `async` Server Components, by calling service functions — never call `axios`/`api` directly inside `page.tsx`/`layout.tsx`.
- Every HTTP call lives in a **service**, in a separate file outside `app/` (e.g. `@/services/*.service.ts`), which imports a single shared axios instance (e.g. `@/services/api.ts`). Pages only import and call already-typed service functions.
- `fetch` has built-in Next.js cache/revalidate; axios does not. To reproduce that behavior:
  - dedupe repeated requests within the same render → wrap the service function with `cache()` from `react`.
  - time-based revalidation (ISR) → wrap the service function with `unstable_cache` from `next/cache`, or set `export const revalidate = N` in `page.tsx`/`layout.tsx`.
  - always-dynamic data (no cache) → don't wrap in `cache`/`unstable_cache`; call the service normally.
- Run independent requests in parallel with `Promise.all`; avoid waterfalls.
- NEVER call your own internal API over HTTP (`api.get('/api/...')`) from a Server Component — call the function/service directly.
- For mutations (create/update/delete), prefer **Server Actions** (`'use server'`) calling the corresponding service.

### Example: axios instance

```ts
// src/services/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 10_000,
});
```

### Example: typed service

```ts
// src/services/users.service.ts
import { api } from "@/services/api";

export type User = {
  id: string;
  name: string;
  email: string;
};

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");
  return data;
}

export async function getUserById(id: string): Promise<User> {
  const { data } = await api.get<User>(`/users/${id}`);
  return data;
}
```

### Example: service with revalidation (ISR)

```ts
// src/services/users.service.ts
import { unstable_cache } from "next/cache";
import { api } from "@/services/api";
import type { User } from "./users.types";

export const getUsers = unstable_cache(
  async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users");
    return data;
  },
  ["users"],
  { revalidate: 60 },
);
```

### Example: page consuming the service

```tsx
// src/app/users/page.tsx
import { getUsers } from "@/services/users.service";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

## Metadata and SEO

- Every indexable page defines `metadata` (static) or `generateMetadata` (dynamic), with at least `title` and `description`.
- In `generateMetadata`, reuse the same data fetch as the page (it's deduplicated).
- Never use the `<head>` tag manually. Configure `metadataBase`, favicon, and OpenGraph in the root `layout.tsx`.

## Dynamic routes and params

- `params` and `searchParams` are **asynchronous**: always `await` them before accessing their properties.
- Type them as `Promise<...>` in the page signature.
- Validate/normalize `params` and `searchParams` before use (e.g. Zod).
- Use `generateStaticParams` when the set of routes is known at build time.
- Call `notFound()` for missing resources instead of rendering an empty screen.

## Error and loading states

- Every segment with a risk of failure (fetch, invalid params) has an `error.tsx`.
- `error.tsx` and `global-error.tsx` MUST start with `'use client'`.
- `error.tsx` does not catch errors from the layout at the same level; for the root layout use `global-error.tsx`.
- Use `loading.tsx` and/or granular `<Suspense>` for loading feedback and streaming.

## Navigation

- Use `<Link>` from `next/link` for declarative navigation (automatic prefetching).
- Import hooks (`useRouter`, `usePathname`, `useSearchParams`) from **`next/navigation`**, NEVER from `next/router`.
- Use `redirect()` for redirects in Server Components/Actions.

## Assets

- Images always via `<Image>` from `next/image`, with `width`/`height` (or `fill` + sized container) to avoid layout shift.
- Fonts via `next/font`.
- Static assets in `public/`, referenced by absolute path (`/logo.svg`).

## TypeScript and conventions

- Explicitly type page and component props. Avoid `any`.
- One component per file. Files in `kebab-case`; components in `PascalCase`.
- Secrets and sensitive variables never go to the client — only `NEXT_PUBLIC_*` reaches the browser.

## Checklist before finishing a page

- [ ] `page.tsx` in the right place with a coherent URL.
- [ ] Server Component by default; `'use client'` only on the leaves that need it.
- [ ] Data fetched on the server via a service using axios (never `fetch`), with an explicit cache strategy (`cache`/`unstable_cache`/`revalidate`).
- [ ] `metadata`/`generateMetadata` with `title` + `description`.
- [ ] `loading.tsx`/`<Suspense>` and `error.tsx` where there's risk.
- [ ] `notFound()` for missing resources.
- [ ] `params`/`searchParams` awaited and validated.
- [ ] `<Link>` and hooks from `next/navigation`.
- [ ] `<Image>` with dimensions; fonts via `next/font`.
- [ ] No secrets leaking to the client.
