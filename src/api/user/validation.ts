
import { User } from './schema';
import * as validate from 'validate.js';
import { UserError } from '../../utils/errors';
import userModel from './model';

export const model = {
  async createUser(payload: User) {
    const constraints = {
      email: {
        presence: true,
        email: true,
      },
      password: {
        presence: true,
        length: {
          minimum: 6,
          message: 'must be at least 6 characters',
        },
      },
    };

    const errors = validate(payload, constraints, { format: 'flat' });
    if (errors && errors.length > 0) throw new Error(errors[0]);

    const existingEmail = await userModel.getUser({ email: payload.email });
    if (existingEmail) throw new Error('Email is already in use');
  },

  updateUser() {

  },
};

export const controller = {
  async createUser(payload: User) {
    try {
      await model.createUser(payload);
    } catch (e) {
      throw new UserError(e.message);
    }
  },

  updateUser() {

  },
};
