import Koa from 'koa';
import Logger from 'services/Logger';

let serverSingleton: Server;

export default class Server {
  static get() {
    if (!serverSingleton) {
      serverSingleton = new Server(Logger.get(), new Koa());
    }

    return serverSingleton;
  }

  constructor(private logger: Logger, private koa: Koa) {}

  public async start(): Promise<void> {
    await new Promise<void>((r) => this.koa.listen(9000, r));

    this.logger.info('Listening on 9000');
  }
}
