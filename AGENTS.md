# AGENTS.md

## Purpose

This document defines the rules and conventions that all AI agents must follow when contributing to this project.

This application is a frontend built with:

- Next.js (App Router)
- React
- TypeScript
- NextAuth for authentication
- CSS Modules or Tailwind CSS (depending on the project configuration)

The main goal is to keep the codebase consistent, secure, reusable, and easy to maintain.

---

# General Principles

- Write clean and readable code.
- Prefer simple solutions over unnecessary complexity.
- Avoid code duplication (DRY).
- Follow the existing project structure.
- Do not modify existing functionality unless necessary.
- Always explain significant changes.

---

# Technology Stack

- React
- Next.js (App Router)
- TypeScript
- NextAuth
- Fetch API
- ESLint
- Prettier

---

# Project Structure

Organize the code using the following structure:

```text
app/
components/
    /Button
        Button.tsx
        Button.module.css
    ...
hooks/
services/
    /user
        user.ts
    ...
lib/
types/
    user.ts
    ...
contexts/
styles/
utils/
```

Each directory should contain files related only to its specific responsibility.

---

# React Components

Components must:

- Be functional components.
- Use TypeScript.
- Be small and reusable.
- Have a single responsibility.
- Receive only the required props.
- Keep complex logic out of JSX.

Preferred structure:

```text
components/
    Button/
        Button.tsx
        Button.module.css
```

---

# Next.js

Use:

- App Router
- Server Components by default
- Client Components only when required (`"use client"`)

Avoid converting entire pages into Client Components when only a small part requires client-side interactivity.

---

# NextAuth

All authentication must use NextAuth.

Rules:

- Never store authentication tokens in Local Storage.
- Use `useSession()` only in Client Components.
- Use `getServerSession()` whenever possible in Server Components.
- Do not duplicate authentication logic.
- Always validate user permissions before displaying protected data.

---

# State Management

Prefer the following order:

1. Local state (`useState`)
2. Context API
3. Server Components
4. External state management libraries only when truly necessary

Avoid introducing global state without a clear need.

---

# API Requests

All API communication must be implemented inside:

```text
services/
```

Example:

```text
services/
    /users
        users.ts
    /products
        products.ts
```

Components should never contain hardcoded API endpoints.

---

# Error Handling

All API calls must:

- Handle errors properly.
- Return meaningful error messages.
- Avoid throwing exceptions without context.

Example:

```typescript
try {
  ...
} catch (error) {
  ...
}
```

---

# TypeScript

Never use:

```typescript
any;
```

Prefer:

- Interfaces
- Types
- Generics

---

# Performance

Prefer:

- Server Components
- Lazy loading where appropriate
- Memoization only when necessary
- Avoid unnecessary re-renders

---

# Accessibility

All components must:

- Include proper labels.
- Be keyboard accessible.
- Use semantic HTML.
- Apply ARIA attributes where appropriate.

---

# Code Style

- Keep functions small.
- Use descriptive variable names.
- Avoid unnecessary comments.
- Prefer self-documenting code.

Avoid:

```typescript
const a = ...
const b = ...
```

Prefer:

```typescript
const authenticatedUser = ...
const activeProducts = ...
```

---

# Security

Never:

- Expose secrets.
- Expose authentication tokens.
- Store sensitive keys in the frontend.
- Assume a user is authenticated without validation.

---

# Import Order

Imports should follow this order:

1. React
2. Next.js
3. External libraries
4. Project aliases
5. Relative imports

---

# Styling

Prefer:

- CSS Modules
- Tailwind CSS (when configured)

Avoid unnecessary global CSS.

---

# Testing

When implementing important features:

- Add unit tests.
- Validate error states.
- Validate loading states.

---

# Naming Conventions

Components:

```text
PascalCase
```

Hooks:

```text
useSomething
```

Functions:

```text
camelCase
```

Constants:

```text
UPPER_CASE
```

Interfaces and Types:

```text
User
Product
ApiResponse
```

---

# Agent Responsibilities

Before writing code, the agent should:

1. Understand the requested functionality.
2. Look for reusable components before creating new ones.
3. Follow the existing project structure.
4. Write code consistent with the rest of the project.
5. Ensure there are no TypeScript errors.
6. Ensure there are no ESLint errors.

---

# SVG Icons

Every SVG added to the project must be converted into a React component and stored in `src/images/`.

Rules:

- **Location:** all icons live in `src/images/`. Do not scatter SVG files across other folders or inline raw SVG markup directly in pages/components.
- **Format:** each SVG must be a React component (`.tsx`), not a `.svg` file imported as a static asset.
- **Naming:** one file per icon, PascalCase, with an `Icon` suffix — e.g. `ArrowRightIcon.tsx`, `UserIcon.tsx`.
- **Props:** the component must accept and spread SVG props (`React.SVGProps<SVGSVGElement>`), so `className`, `width`, `height`, etc. can be customized at the call site.
- **Color:** use `currentColor` for `fill`/`stroke` on monochrome icons, so they inherit the surrounding text color via CSS.
- **Exports:** register every new icon in the barrel file `src/images/index.ts`.
- **Cleanup:** strip unnecessary attributes from the original SVG (`id`, `class`, editor comments, unused `xmlns:xlink`) and convert attributes to camelCase (`stroke-width` → `strokeWidth`, `fill-rule` → `fillRule`).

Example component:

```tsx
// src/images/ArrowRightIcon.tsx
import type { SVGProps } from 'react';

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 12h14M12 5l7 7-7 7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
```

Example barrel file:

```ts
// src/images/index.ts
export { ArrowRightIcon } from './ArrowRightIcon';
export { UserIcon } from './UserIcon';
```

Usage:

```tsx
import { ArrowRightIcon } from '@/images';

<ArrowRightIcon className="w-5 h-5 text-blue-500" />;
```

# Agent Restrictions

The agent must not:

- Modify files unnecessarily.
- Change established project conventions.
- Add dependencies without clear justification.
- Use `any`.
- Create oversized components.
- Duplicate business logic.
- Ignore errors.
- Place business logic inside UI components.

---

# Quality Standards

All delivered code must be:

- Buildable
- Fully typed
- Testable
- Reusable
- Secure
- Readable
- Aligned with React and Next.js best practices

Whenever multiple valid solutions exist, choose the one that is the simplest, most readable, and easiest to maintain.
