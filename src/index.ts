
import * as Koa from 'koa';
import * as chalk from 'chalk';
import * as https from 'https';
import * as etag from 'koa-etag';
import * as helmet from 'koa-helmet';
import * as kstatic from 'koa-static';
import * as compress from 'koa-compress';
import * as bodyParser from 'koa-bodyparser';
import * as conditional from 'koa-conditional-get';
import { readFileSync } from 'fs';

import config from './config';
import * as jsend from './utils/jsend';
import Logger from './utils/logger';
import database from './database';
import api from './api';

export class Server {
  public koa = new Koa();
  private logger = new Logger('Server');

  constructor() {
    this.middleware();
    this.koa.use(api.router.routes());

    this.logger.verbose('Initialized');
  }

  async start() {
    this.logger.verbose('Syncing database models');
    await database.sequelize.sync();

    await new Promise((resolve) => {
      https.createServer({
        key: readFileSync(config.ssl.key),
        cert: readFileSync(config.ssl.cert),
      }, this.koa.callback())
        .listen(config.port, () => resolve());
    });

    this.logger.info(`Listening on ${config.port}`);
  }

  private middleware() {
    this.logger.verbose('Registering middleware');

    const httpLogger = new Logger(chalk.yellow('HTTP'));
    this.koa.use(async (ctx, next) => {
      httpLogger.verbose('--in->', ctx.method, ctx.url);
      await next();
      httpLogger.verbose('<-out-', ctx.method, ctx.url, ctx.status);
    });

    this.koa.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"], // tslint:disable-line
        },
      },
      frameguard: {
        action: 'deny',
      },
    }));

    this.koa.use(compress());
    this.koa.use(conditional());
    this.koa.use(etag());
    this.koa.use(bodyParser());
    this.koa.use(kstatic(config.staticPath));

    this.koa.use(async (ctx, next) => {
      try {
        await next();
      } catch (error) {
        if (error.status < 500) {
          this.logger.verbose(`${error.name}: ${error.message}`);
          ctx.status = error.status;
          ctx.body = jsend.fail(error.message);
        } else {
          this.logger.error(error);
          ctx.status = error.status || 500;
          ctx.body = jsend.error();
          // ctx.app.emit('error', error, ctx);
        }
      }
    });
  }
}

export default new Server();
