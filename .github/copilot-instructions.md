# Copilot Coding Agent Onboarding Instructions for shopiew

## Repository Summary
This repository is a monorepo for Shopiew, a modern e-commerce platform. It contains multiple apps (admin, seller, main) and shared packages. The codebase is designed for full-stack development, supporting admin dashboards, seller portals, and main storefronts. It uses modern web technologies,Nextjs v15 features and is structured for scalability and maintainability.

## High-Level Information
- **Type:** Monorepo (multi-app, multi-package)
- **Languages:** TypeScript, JavaScript
- **Frameworks:** Next.jsv15 (main, seller), Vite + Vue (admin), React, Tailwind CSS, Radix UI, Zustand, React Query
- **Package Manager:** pnpm (workspaces)
- **Build Tools:** TurboRepo, Vite, Next.js
- **Testing:** Vitest (admin), Jest (seller), Playwright (admin e2e)
- **Linting:** ESLint (per app), Prettier
- **CI:** GitHub Actions (see workflows in `.github/workflows/`)
- **Node Version:** >=18.x recommended

## Build & Validation Instructions

### Common Issues & Workarounds
- **pnpm version errors:** Reinstall pnpm globally.
- **Multiple lockfiles:** Remove extra lockfiles from app folders; keep only the root lockfile.
- **TurboRepo build retries:** Usually caused by missing dependencies or misconfigured workspace. Run `pnpm install` and check `pnpm-workspace.yaml`.
- **Next.js Suspense errors:** Wrap providers using hooks like `useSearchParams` in `<Suspense>` and use `loading.tsx` for route segments.
- **TypeScript errors:** Check types in shared packages and app-specific configs.

## Project Layout & Architecture
- **Repo Root:** Contains `package.json`, `pnpm-workspace.yaml`, `turbo.json`, and lockfile.
- **apps/**: Contains main apps:
  - `admin/`: Vite + Vue, Playwright e2e, Vitest, ESLint
  - `seller/`: Next.js, Jest, ESLint
  - `main/`: Next.js, ESLint
- **packages/**: Shared code and utilities (TypeScript)
- **.github/**: GitHub Actions workflows and Copilot instructions
- **Configuration Files:**
  - Lint: `eslint.config.mjs` in each app
  - Build: `turbo.json`, `vite.config.ts`, `next.config.ts`
  - Test: `jest.config.ts`, `vitest.config.ts`, `playwright.config.ts`
  - Workspace: `pnpm-workspace.yaml`

## Validation & CI
- **GitHub Actions:** Automated build, lint, and test on push/PR. See `.github/workflows/` for details.
- **Pre-commit:** Lint and test should pass before check-in.
- **Manual Validation:** Always run `pnpm build`, `pnpm test`, and `pnpm lint` before submitting changes.

## Key Files in Repo Root
- `package.json`, `pnpm-workspace.yaml`, `turbo.json`, `pnpm-lock.yaml`
- No README.md or CONTRIBUTING.md found (add if needed for more onboarding info).

## Agent Guidance
- Trust these instructions for build, test, and validation steps.
- Perform additional searches if these instructions are incomplete or found to be in error.
- For new features, prefer adding code to the appropriate app in `apps/` or shared logic in `packages/`.
- For config changes, update the relevant config file in the app or repo root.
- For CI validation, ensure all steps pass locally before submitting.
- Always refer to best practices for building with Next.js, Vue.js. Use their most modern features.

---
