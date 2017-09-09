
import { request } from '../../index.test';
import { expect } from 'chai';

describe('UserController', () => {
  describe('.getUsers', () => {
    it('should retrieve a list of users', async () => {
      const { body, status } = await request.get('/api/users');

      expect(status).to.equal(200);
      expect(body).to.have.all.keys(['status', 'data']);
      expect(body.status).to.equal('success');
      expect(body.data).to.be.an('array');
      expect(body.data.length).to.be.greaterThan(0);
      body.data.forEach((user: any) => {
        expect(user).to.have.all.keys([
          'id',
          'email',
          'createdAt',
          'updatedAt',
        ]);
      });
    });
  });

  describe('.createUser', () => {
    it('should fail if missing email', async () => {
      const { body, status } = await request.post('/api/users')
        .send({ password: 'password' });

      expect(status).to.equal(400);
      expect(body).to.have.all.keys(['status', 'message']);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('Email can\'t be blank');
    });

    it('should fail if email is invalid', async () => {
      const { body, status } = await request.post('/api/users')
        .send({ email: 'invalid', password: 'password' });

      expect(status).to.equal(400);
      expect(body).to.have.all.keys(['status', 'message']);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('Email is not a valid email');
    });

    it('should fail if email missing password', async () => {
      const { body, status } = await request.post('/api/users')
        .send({ email: 'test@test.com' });

      expect(status).to.equal(400);
      expect(body).to.have.all.keys(['status', 'message']);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('Password can\'t be blank');
    });

    it('should fail if email password is too short', async () => {
      const { body, status } = await request.post('/api/users')
        .send({ email: 'test@test.com', password: 'short' });

      expect(status).to.equal(400);
      expect(body).to.have.all.keys(['status', 'message']);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('Password must be at least 6 characters');
    });

    it('should fail if the email is in use', async () => {
      const { body, status } = await request.post('/api/users')
        .send({ email: 'garrett@test.com', password: 'password' });

      expect(status).to.equal(400);
      expect(body).to.have.all.keys(['status', 'message']);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('Email is already in use');
    });

    it('should create a new user', async () => {
      const { body, status } = await request.post('/api/users')
        .send({ email: 'test@test.com', password: 'password' });

      expect(status).to.equal(200);
      expect(body).to.have.all.keys(['status', 'data']);
      expect(body.status).to.equal('success');
      expect(body.data).to.be.an('object');
      expect(body.data).to.have.all.keys([
        'id',
        'email',
        'createdAt',
        'updatedAt',
      ]);
    });
  });

  describe('.getUser', () => {
    it('should fail if the user id is invalid', async () => {
      const { body, status } = await request.get('/api/users/invalid');

      expect(status).to.equal(404);
      expect(body).to.have.all.keys(['status', 'message']);
      expect(body.status).to.equal('fail');
      expect(body.message).to.equal('User not found');
    });

    it('should retrieve information about the user', async () => {
      const { body, status } = await request.get('/api/users/1');

      expect(status).to.equal(200);
      expect(body).to.have.all.keys(['status', 'data']);
      expect(body.status).to.equal('success');
      expect(body.data).to.be.an('object');
      expect(body.data).to.have.all.keys([
        'id',
        'email',
        'createdAt',
        'updatedAt',
      ]);
      expect(body.data.id).to.equal(1);
      expect(body.data.email).to.equal('garrett@test.com');
    });
  });
});
