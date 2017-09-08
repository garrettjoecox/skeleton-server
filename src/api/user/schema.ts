
import * as Sequelize from 'sequelize';
import database from '../../database';

export interface User {
  email: string;
  password: string;
  id?: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface OmittedUser {
  email: string;
  id: number;
  updatedAt: string;
  createdAt: string;
}

export interface UserInstance extends Sequelize.Instance<User> {
  dataValues: User;
}

const userSchema = database.sequelize.define<UserInstance, User>('user', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

export default userSchema;
