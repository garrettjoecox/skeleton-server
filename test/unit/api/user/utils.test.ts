
import * as userUtils from '../../../../src/api/user/utils';
import { expect } from 'chai';

describe('userUtils', () => {
  describe('.omit', () => {
    it('should omit the appropriate properties from a user object', () => {
      const user = {
        email: 'test@test.com',
        password: 'password',
      };

      const omitted = <any>userUtils.omit(user);

      expect(omitted).to.have.all.keys(['email']);
      expect(omitted.email).to.equal('test@test.com');
      expect(omitted.password).to.be.undefined;
    });
  });
});
