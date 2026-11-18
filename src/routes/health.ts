import type { FastifyInstance, FastifyPluginAsync } from 'fastify';

export const healthRoutes: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.get('/health', async () => ({
    status: 'ok',
    uptime: Math.round(process.uptime()),
  }));
};
