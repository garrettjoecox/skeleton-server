
import Logger from '../../utils/logger';
import userSchema, { User } from './schema';
import * as _ from 'lodash';
import { model as validate } from './validation';

export class UserModel {
  private logger = new Logger('UserModel');

  constructor() {
    this.logger.verbose('Initialized');
  }

  async getUsers(): Promise<User[]> {
    this.logger.verbose('getUsers');
    const users = await userSchema.findAll();

    return users.map(user => user.get());
  }

  async createUser(payload: User): Promise<User> {
    this.logger.verbose('createUser');
    const newUserProps = <User>_.pick(payload, ['email', 'password']);

    await validate.createUser(newUserProps);

    const user = await userSchema.create(newUserProps);

    return user.get();
  }

  async getUser(query: object) {
    this.logger.verbose('getUser');
    const user = await userSchema.find({ where: query });

    return user ? user.get() : null;
  }

  async getUserStrict(query: object) {
    this.logger.verbose('getUserStrict');
    const user = await this.getUser(query);

    if (!user) throw new Error('User not found');
    return user;
  }

  importFixtures(users: User[]): Promise<User[]> {
    return Promise.all(users.map(user => this.createUser(user)));
  }
}

export default new UserModel();
