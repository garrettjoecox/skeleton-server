
import { resolve } from 'path';
import { defaultsDeep } from 'lodash';

export class Config {
  public env: string = process.env.NODE_ENV || 'development';
  public port: string = process.env.PORT || '9000';
  public logLevel: string = 'info';
  public staticPath: string = resolve(__dirname, '../../node_modules/skeleton-client');

  public ssl = {
    key: 'Configure in env',
    cert: 'Configure in env',
  };

  public database = {
    host: 'localhost',
    port: 3306,
    user: 'configure in env',
    password: 'Configure in env',
    database: 'Configure in env',
  };

  constructor() {
    try {
      let local = {};
      try {
        local = require('./env/local');
      } catch (e) {}
      const env = require(`./env/${this.env}`);

      Object.assign(this, defaultsDeep({}, local, env, this));
    } catch (e) {
      throw new Error(`Invalid env "${this.env}"`);
    }
  }
}

export default new Config();
