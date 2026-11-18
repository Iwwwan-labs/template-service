import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { healthRoutes } from './health';

export const registerRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  await app.register(healthRoutes);
};
