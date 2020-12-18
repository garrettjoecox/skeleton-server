import Server from 'Server';
import Logger from 'services/Logger';

(async () => {
  const logger = Logger.get();
  try {
    const server = Server.get();

    await server.start();
  } catch (error) {
    logger.error(error);
  }
})();
