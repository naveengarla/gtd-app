# GTD App

Offline-first PWA for managing tasks following Getting Things Done.

## Setup

```bash
pnpm install
pnpm dev
```

## Scripts

- `pnpm dev` – start web app
- `pnpm build` – build web app
- `pnpm test` – run unit tests
- `pnpm e2e` – run Playwright smoke test
- `pnpm seed` – seed IndexedDB with sample data

## Architecture

Monorepo layout:

- `packages/core` – domain models, priority util, quick-add parser, selectors
- `packages/storage` – Dexie database and repositories, seed script
- `apps/web` – React UI using Zustand state
- `e2e` – Playwright tests

## Design notes

Storage access is abstracted through repository interfaces. To extend to Electron with SQLite in v0.2, create new adapters implementing the same repos using a SQLite driver and replace the imports from `@storage/repositories`.
