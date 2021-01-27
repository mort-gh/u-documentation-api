import pino, { LoggerOptions } from 'pino';

export const loggerOptions: LoggerOptions = {
  prettyPrint: true,
};

const logger = pino(loggerOptions);

export default logger;
