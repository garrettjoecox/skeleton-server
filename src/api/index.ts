
import * as Router from 'koa-router';
import Logger from '../utils/logger';
import userApi from './user';

export class Api {
  public router = new Router({ prefix: '/api' });
  private logger = new Logger('Api');

  constructor() {
    this.router
      .use('/users', userApi.router.routes());

    this.logger.verbose('Initialized');
  }
}

export default new Api();
