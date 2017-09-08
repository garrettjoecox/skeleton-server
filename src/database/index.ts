
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
}

export default new Database();
