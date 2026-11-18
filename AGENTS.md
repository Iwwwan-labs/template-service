# AGENTS.md

Guidance for AI agents working in this repository.

## What this is

A starter template for HTTP services: Fastify 5 on Node 22, strict TypeScript,
Vitest, tsup, ESLint, Prettier, and a multi-stage Dockerfile.

## Commands

```bash
npm ci                # install exactly from the lockfile
npm run dev           # watch-mode dev server
npm run build         # typecheck + bundle
npm run lint          # ESLint
npm run format:check  # Prettier check
npm run typecheck     # tsc --noEmit
npm test              # Vitest, single run
```

Always run `lint`, `typecheck`, and `test` before considering a change complete.

## Layout

- `src/app.ts` — `buildServer()` builds the Fastify instance. It never listens.
- `src/server.ts` — reads env, calls `listen()`, and wires graceful shutdown.
- `src/routes/` — Fastify plugins registered under the `/api` prefix.

## Rules

- Keep `buildServer()` free of side effects so tests can call it directly.
- Test routes with `app.inject()`, not by binding a port.
- Register new route groups as plugins and add them to `src/routes/index.ts`.
- Validate request input with Fastify JSON schemas. Do not trust raw input.
- Never log secrets or full request bodies.
- TypeScript is strict. Do not weaken `tsconfig.json` to make code compile.
- Do not use `any`. If unavoidable, add a comment explaining why.
- Use the `@/` alias for imports from `src/`.
- Justify every new dependency in the pull request.

## Testing

- Test behavior through the HTTP layer with `app.inject()`.
- Cover the success path, the failure path, and validation errors.
- Keep tests independent; each builds its own server in `beforeAll`.

Follow the organization conventions in
[`Iwwwan-labs/.github`](https://github.com/Iwwwan-labs/.github/blob/main/docs/CONVENTIONS.md).
