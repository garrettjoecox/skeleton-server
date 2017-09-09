
import * as _ from 'lodash';
import { User, OmittedUser } from './schema';

export function omit(user: User): OmittedUser {
  return <OmittedUser>_.omit(user, ['password']);
}
