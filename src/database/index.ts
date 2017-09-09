
import * as Sequelize from 'sequelize';
import config from '../config';

export class Database {
  public sequelize: Sequelize.Sequelize;

  constructor() {
    this.sequelize = new Sequelize(config.database.database, config.database.user, config.database.password, {
      host: config.database.host,
      port: config.database.port,
      dialect: 'mysql',
      logging: false,
    });
  }

  async importFixtures() {
    const userModel = require('../api/user/model').default;

    const fixtures: any = {
      users: [],
    };

    try {
      const env = require(`./fixtures/${config.env}`);
      Object.assign(fixtures, env);
    } catch (e) {}

    await userModel.importFixtures(fixtures.users);
  }

  migrate() {

  }
}

export default new Database();
