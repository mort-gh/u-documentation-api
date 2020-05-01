import fastify from 'fastify';

import cors from 'fastify-cors';

import swagger from 'lib/swagger';
import { loggerOptions } from 'lib/logger';

import routes from 'routes';

import { serviceConfig } from 'config';

const app = fastify({ logger: loggerOptions, ignoreTrailingSlash: true });

swagger.register(app);

app.register(cors /*{ origin: serviceConfig.allowHosts }*/);

routes.forEach(route => route(app));

const start = async (): Promise<void> => {
  try {
    await app.listen({ host: '0.0.0.0', port: +serviceConfig.port });

    if (process.env.NODE_ENV === 'development') app.log.info(app.printRoutes());
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
};

start();
