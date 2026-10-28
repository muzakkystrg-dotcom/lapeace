# lapeace

Backend service — **NestJS 12** (TypeScript, ESM) + Express.

## Requirements

| Tool | Version |
|---|---|
| Node.js | >= 20 (dev dites pakai v26) |
| npm | >= 10 |

## Quick start

```bash
git clone git@github.com:muzakkystrg-dotcom/lapeace.git
cd lapeace
npm install
npm run start:dev
```

Server jalan di `http://localhost:3000`.

```bash
curl http://localhost:3000
# Hello World!
```

## Scripts

| Command | Fungsi |
|---|---|
| `npm run start` | jalanin sekali (no watch) |
| `npm run start:dev` | watch mode — pakai ini buat ngoding |
| `npm run start:debug` | watch + debugger di `:9229` |
| `npm run build` | compile ke `dist/` |
| `npm run start:prod` | jalanin hasil build (`node dist/main`) |
| `npm run test` | unit test (Vitest) |
| `npm run test:watch` | unit test watch |
| `npm run test:cov` | unit test + coverage |
| `npm run test:e2e` | e2e test (Vitest) |
| `npm run lint` | oxlint (type-aware) |
| `npm run format` | prettier |

## Struktur

```
src/
  main.ts               # bootstrap, listen port
  app.module.ts         # root module
  app.controller.ts     # contoh controller
  app.service.ts        # contoh service
test/
  app.e2e-spec.ts       # contoh e2e test
nest-cli.json           # config CLI Nest
vitest.config.ts        # config unit test
vitest.config.e2e.ts    # config e2e test
```

Nambah fitur baru: `npx nest g resource <nama>` (generate module + controller + service + DTO sekaligus).

## Konvensi branch

- `main` — stabil
- `development` — branch kerja bareng
- fitur baru: `feat/<nama-fitur>` → PR ke `development`

## Catatan

`AGENTS.md` isinya info opsional soal NestJS Observe (telemetry). Belum di-setup, jadi belum ada data yang dikirim ke mana-mana.
