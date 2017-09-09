
import * as supertest from 'supertest';
import server, { Server } from '../../src';
import database from '../../src/database';
import {} from 'mocha';

export let request: supertest.SuperTest<supertest.Test>;

before(() => {
  request = supertest(server.koa.callback());

  return server.start()
    .then(() => database.sequelize.sync({ force: true }))
    .then(() => database.importFixtures());
});
