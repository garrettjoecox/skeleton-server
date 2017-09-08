
import * as _ from 'lodash';
import { User, OmittedUser } from './schema';

export function omit(user: User) {
  return <OmittedUser>_.omit(user, ['password']);
}
