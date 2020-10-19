import { expect } from 'chai';
import { it } from 'mocha';
import { validateRegister, validateLogin } from '../../../src/data/validations/user';

export default function () {
  it('Valid register test', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhon@doe.at',
      password: '123456',
    };

    const result = validateRegister(user);

    expect(result).to.not.contain.keys(['error']);
    expect(result).to.contain.keys(['value']);
  });

  it('Invalid register test', async () => {
    const user = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'jhondoe.at',
      password: '_',
    };

    const result = validateRegister(user);

    expect(result).to.contain.keys(['error']);
    expect(result).to.contain.keys(['value']);
  });

  it('Valid login test', async () => {
    const user = {
      email: 'jhon.doe@akinon.com',
      password: '123456',
    };

    const result = validateLogin(user);

    expect(result).to.not.contain.keys(['error']);
    expect(result).to.contain.keys(['value']);
  });

  it('Invalid login test', async () => {
    const user = {
      email: 'jhondoe.at',
      password: '_______',
    };

    const result = validateRegister(user);

    expect(result).to.contain.keys(['error']);
    expect(result.error.details[0]).to.contain.keys(['message']);
  });
}
