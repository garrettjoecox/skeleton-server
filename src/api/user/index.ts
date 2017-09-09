
import * as Router from 'koa-router';
import Logger from '../../utils/logger';
import userController from './controller';

export class UserApi {
  public router = new Router();
  private logger = new Logger('UserApi');

  constructor() {
    this.router
       .get('/',    userController.getUsers.bind(userController))
      .post('/',    userController.createUser.bind(userController))
       .get('/:id', userController.getUser.bind(userController))
       .put('/:id', userController.updateUser.bind(userController))
    .delete('/:id', userController.deleteUser.bind(userController));

    this.logger.verbose('Initialized');
  }
}

export default new UserApi();
