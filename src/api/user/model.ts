
import Logger from '../../utils/logger';
import userSchema, { User } from './schema';

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
}

export default new UserModel();
