import fastify from 'fastify';

import fastifySwagger from 'fastify-swagger';

const register = (app: fastify.FastifyInstance): void => {
  app.register(fastifySwagger, {
    routePrefix: '/$wagger',
    exposeRoute: true,
    swagger: {
      info: {
        title: 'Github API Middleware',
        description: 'Swagger API Documentation',
        version: '1.0.0',
      },
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        baseAuth: {
          type: 'basic',
        },
      },
    },
  });
};

export default { register };
