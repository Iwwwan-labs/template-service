import Fastify, { type FastifyInstance } from 'fastify';
import { registerRoutes } from './routes/index';

export interface BuildServerOptions {
  logger?: boolean;
}

export function buildServer(options: BuildServerOptions = {}): FastifyInstance {
  const app = Fastify({
    logger: options.logger ?? false,
  });

  app.register(registerRoutes, { prefix: '/api' });

  return app;
}
