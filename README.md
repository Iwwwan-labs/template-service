# Iwwwan-labs service template

Starter for HTTP services. Fastify 5 on Node 22 with TypeScript in strict mode,
Vitest for tests, tsup for builds, and a multi-stage Dockerfile.

## Getting started

```bash
npm install
npm run dev
```

The server listens on http://localhost:3000 by default. Check it with:

```bash
curl http://localhost:3000/api/health
```

## Scripts

| Command                | What it does                           |
| ---------------------- | -------------------------------------- |
| `npm run dev`          | Run the server with watch mode (tsx)   |
| `npm run build`        | Typecheck and bundle to `dist/` (tsup) |
| `npm start`            | Run the built server                   |
| `npm test`             | Run the test suite once                |
| `npm run test:watch`   | Run tests in watch mode                |
| `npm run lint`         | Run ESLint                             |
| `npm run typecheck`    | Typecheck without emitting             |
| `npm run format`       | Format with Prettier                   |
| `npm run format:check` | Check formatting without writing       |

## Layout

```text
src/
├── app.ts               <- buildServer(): creates the Fastify instance
├── server.ts            <- entry point: reads env, listens, handles shutdown
└── routes/
    ├── index.ts         <- route registration, mounted at /api
    ├── health.ts        <- GET /api/health
    └── health.test.ts   <- route tests using app.inject()
```

## Configuration

Copy `.env.example` to `.env`. Environment variables:

| Variable | Default   | Purpose           |
| -------- | --------- | ----------------- |
| `PORT`   | `3000`    | Port to listen on |
| `HOST`   | `0.0.0.0` | Interface to bind |

## Testing

`buildServer()` returns the app without listening, so tests use `app.inject()`
instead of a real socket. This keeps tests fast and avoids port conflicts.

## Docker

```bash
docker build -t template-service .
docker run --rm -p 3000:3000 template-service
```

The image is multi-stage: build with dev dependencies, then run with production
dependencies only, as the non-root `node` user.

## Conventions

- `@/` maps to `src/`.
- Register routes as Fastify plugins under `src/routes/`.
- Keep business logic out of route handlers; put it in modules that routes call.
- Tests live next to the code they cover, as `*.test.ts`.

## Contributing

See [`Iwwwan-labs/.github/CONTRIBUTING.md`](https://github.com/Iwwwan-labs/.github/blob/main/CONTRIBUTING.md).

## License

[MIT](LICENSE) © Iwwwan-labs
