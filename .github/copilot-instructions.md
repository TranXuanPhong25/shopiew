# Copilot Coding Agent Onboarding Instructions for shopiew

## Repository Summary
This repository is a monorepo for Shopiew, a modern e-commerce platform. It contains multiple apps (admin, seller, main) and shared packages. The codebase is designed for full-stack development, supporting admin dashboards, seller portals, and main storefronts. It uses modern web technologies, Next.js v15 features and is structured for scalability and maintainability.

## High-Level Information
- **Type:** Monorepo (multi-app, multi-package)
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Next.js v15 (main, seller), Vite + Vue 3 (admin), React 19, Tailwind CSS, Radix UI, Zustand, React Query
- **Package Manager:** pnpm (workspaces)
- **Build Tools:** TurboRepo, Vite, Next.js
- **Testing:** Vitest (admin), Jest (seller), Playwright (admin e2e)
- **Linting:** ESLint (per app), Prettier
- **CI:** GitHub Actions (see workflows in `.github/workflows/`)
- **Node Version:** >=18.x recommended

## Architecture & Feature Organization Patterns

### Feature-Based Structure (Next.js Apps)
Both `main` and `seller` apps follow a feature-based architecture:
```
src/
├── features/           # Business domain features
│   ├── auth/          # Authentication feature
│   │   ├── components/
│   │   ├── context.ts
│   │   ├── hook.ts
│   │   ├── models.ts
│   │   ├── provider.tsx
│   │   ├── service.ts
│   │   └── index.ts   # Feature exports
│   ├── carts/
│   ├── products/
│   └── ...
├── components/        # Shared UI components
├── app/              # Next.js app router structure
├── stores/           # Zustand global state
└── utils/            # Shared utilities
```

### State Management Strategy
- **Zustand:** Global state (cart, UI state) with persistence
- **React Query:** Server state, caching, and API integration
- **Context + Provider:** Feature-scoped state (auth, themes)
- **Providers in layout.tsx:** Nested provider pattern for clean separation

### API Integration Pattern
- **Centralized axios client:** `src/utils/axiosClient.ts` with interceptors
- **Feature services:** Each feature has its own service class (e.g., `CartService`)
- **Type safety:** TypeScript types defined per feature (`types.ts`)

## App-Specific Information

### Main App (`apps/main`)
- **Purpose:** Customer-facing storefront
- **Tech:** Next.js 15 + React 19 + Tailwind + Radix UI
- **Key Features:** Product browsing, cart, authentication, search
- **State:** Zustand stores for cart management with localStorage persistence

### Seller App (`apps/seller`)
- **Purpose:** Seller dashboard and shop management
- **Tech:** Next.js 15 + React 19 + additional AI SDK components
- **Key Features:** Product management, shop analytics, notifications, chat widget
- **Testing:** Jest configuration for unit tests

### Admin App (`apps/admin`)
- **Purpose:** Platform administration
- **Tech:** Vite + Vue 3 + Pinia + Naive UI
- **Architecture:** Module-based organization (`src/modules/`)
- **Testing:** Vitest + Playwright for e2e

## Build & Validation Instructions

### Development Commands
```bash
pnpm dev          # Start all apps in development
pnpm build        # Build all apps via TurboRepo
pnpm test         # Run all tests
pnpm lint         # Lint all apps
```

### Common Issues & Workarounds
- **pnpm version errors:** Ensure pnpm@10.4.1+ (specified in packageManager)
- **Multiple lockfiles:** Keep only root `pnpm-lock.yaml`
- **TurboRepo cache issues:** Clear with `pnpm turbo clean`
- **Next.js Suspense errors:** Wrap providers using hooks like `useSearchParams` in `<Suspense>`
- **TypeScript path resolution:** Check `tsconfig.json` paths and workspace references

## Key Conventions & Patterns

### Component Structure
- **UI Components:** Radix UI primitives with Tailwind styling
- **Feature Components:** Co-located with business logic in feature directories
- **Shared Components:** In `src/components/` with sub-categorization (layout, form, ui)

### Import/Export Patterns
- **Feature barrel exports:** Each feature has `index.ts` for clean imports
- **Absolute imports:** Use `@/` path mapping consistently
- **Type imports:** Separate type imports from value imports

### Error Handling & Loading States
- **React Query:** Built-in loading, error, and success states
- **Toast notifications:** Sonner for user feedback
- **Progress indicators:** `@bprogress/next` for navigation feedback

## Configuration Files
- **Root:** `turbo.json`, `pnpm-workspace.yaml`, `package.json`
- **Next.js:** `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`
- **Vue/Vite:** `vite.config.ts`, `vitest.config.ts`
- **Testing:** `jest.config.ts`, `playwright.config.ts`
- **Linting:** `eslint.config.mjs` per app

## Maintainability-First Architecture Patterns

### 1. Feature Module Standard Structure
Every feature MUST follow this exact structure for consistency:
```
features/[feature-name]/
├── components/          # UI components specific to feature
├── hooks/              # Custom hooks (use-[feature-action].ts)
├── context.ts          # Feature-specific context (if needed)
├── models.ts           # TypeScript interfaces and types
├── service.ts          # API calls and external integrations
├── provider.tsx        # Context provider (if needed)
├── index.ts            # Barrel exports for clean imports
└── types.ts            # Additional type definitions
```

### 2. Error Handling Standards
- **Centralized Error Handler:** Use existing `apiErrorHandler.ts` in each app
- **Service Layer:** All API calls must use try-catch with consistent error format
- **UI Feedback:** Always use toast notifications (Sonner) for user feedback
- **React Query:** Leverage built-in error states with `onError` callbacks

### 3. State Management Decision Tree
```
Global UI State (cart, theme) → Zustand + persistence
Server State (API data) → React Query with proper cache keys
Feature-scoped State (auth, forms) → Context + Provider pattern
Component State (toggles, inputs) → useState/useReducer
```

### 4. API Integration Standards
- **Axios Client:** Extend existing `axiosClient.ts` with interceptors
- **Service Classes:** One service per feature with consistent method naming
- **Query Keys:** Use descriptive arrays: `['feature', 'action', ...params]`
- **Type Safety:** Define request/response types in `types.ts`

### 5. Component Architecture Patterns
- **Composition over Inheritance:** Use Radix UI primitives with custom styling
- **Props Interface:** Always define explicit TypeScript interfaces
- **Barrel Exports:** Export all public APIs through feature `index.ts`
- **File Naming:** Use kebab-case for files, PascalCase for components

### 6. Cross-App Code Sharing
- **Shared Logic:** Move reusable business logic to `packages/`
- **UI Components:** Keep app-specific in respective `components/` folders
- **Types:** Share common types through workspace references
- **Utils:** App-specific utilities in `utils/`, shared in `packages/`

## Agent Guidance
- **Feature Development:** ALWAYS follow the Feature Module Standard Structure above
- **Error Handling:** Use centralized `apiErrorHandler` + toast notifications for all failures
- **State Management:** Follow the decision tree - don't mix global/local state incorrectly
- **API Integration:** Extend `axiosClient`, create feature services, use React Query properly
- **Component Creation:** Radix UI + Tailwind, explicit props interfaces, proper exports
- **Testing:** Add tests matching app patterns (Jest for seller, Vitest for admin)
- **Code Quality:** Run `pnpm build` and `pnpm lint` before any commits
- **Maintainability:** Prioritize consistency over cleverness - follow established patterns exactly

---
