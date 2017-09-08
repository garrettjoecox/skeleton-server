
import { Context as Ctx } from 'koa';
import Logger from '../../utils/logger';
import userModel from './model';
import * as jsend from '../../utils/jsend';
import * as userUtils from './utils';

export class UserController {
  private logger = new Logger('UserController');

  constructor() {
    this.logger.verbose('Initialized');
  }

  async getUsers(ctx: Ctx) {
    this.logger.verbose('getUsers');
    const users = await userModel.getUsers();
    const omitted = users.map(user => userUtils.omit(user));

    ctx.body = jsend.success(omitted);
  }
}

export default new UserController();
