
import { Context as Ctx } from 'koa';
import Logger from '../../utils/logger';
import userModel from './model';
import * as jsend from '../../utils/jsend';
import * as userUtils from './utils';
import { User } from './schema';
import * as _ from 'lodash';
import { controller as validate } from './validation';

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

  async createUser(ctx: Ctx) {
    this.logger.verbose('createUser');
    const payload = <User>_.pick(ctx.request.body, ['email', 'password']);

    await validate.createUser(payload);

    const user = await userModel.createUser(payload);
    const omitted = userUtils.omit(user);

    ctx.body = jsend.success(omitted);
  }

  async getUser(ctx: Ctx) {
    this.logger.verbose('getUser');
    const id = ctx.params.id;

    await validate.getUser(id);

    const user = await userModel.getUserStrict({ id });
    const omitted = userUtils.omit(user);

    ctx.body = jsend.success(omitted);
  }

  async updateUser(ctx: Ctx) {
    this.logger.verbose('updateUser');
    ctx.throw(501);
  }

  async deleteUser(ctx: Ctx) {
    this.logger.verbose('deleteUser');
    ctx.throw(501);
  }
}

export default new UserController();
