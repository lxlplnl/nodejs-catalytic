import { expect } from 'chai';
import { it } from 'mocha';
import * as jwt from 'jsonwebtoken';
import { UserDAO } from '../../../src/data/daos';

const john = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@catalytic.com',
  password: '123456',
};
export default function () {
  it('New user saved to database', async () => {
    const user = UserDAO.Model(john);

    const result = await UserDAO.create(user);

    expect(result.firstName).to.be.eql(john.firstName);
    expect(result.lastName).to.be.eql(john.lastName);
    expect(result.email).to.be.eql(john.email);
    expect(result.password).to.be.not.eql(john.password);
  });

  it('Should retrieve data from database', async () => {
    await UserDAO.list({ email: 'john@catalytic.com' }).then((user) => {
      expect(user.docs).to.have.lengthOf(1);
    });
  });

  it('Should get and getUnsafe data from database', async () => {
    const user = await UserDAO.findOne({ email: 'john@catalytic.com' });
    const getResult = await UserDAO.get(user._id);
    const getUnsafeResult = await UserDAO.getUnsafe(user._id);

    expect(getResult.password).to.be.undefined;
    expect(getUnsafeResult.password).to.be.exist;
  });

  it('Change user data', async () => {
    const user = await UserDAO.findOne({ email: 'john@catalytic.com' });
    user.firstName = 'Jane';
    user.password = 'qwerty';
    const result = await user.save();
    expect(result.firstName).to.be.eql('Jane');
    expect(result.password).to.be.not.eql('qwerty');
  });

  it('Change user data without password', async () => {
    const user = await UserDAO.findOne({ email: 'john@catalytic.com' });
    user.firstName = 'John';
    const result = await user.save();
    expect(result.firstName).to.be.eql('John');
  });

  it('Change user with wrong data', async () => {
    const user = await UserDAO.findOne({ email: 'john@catalytic.com' });
    user.firstName = '_';
    try {
      const result = await UserDAO.update(user._id, user.toObject());
      expect(result.firstName).to.be.not.eql('_');
    } catch (e) {
      expect(e).to.be.an('object');
    }
  });

  it('Dont save incorrect format to database', async () => {
    const user = UserDAO.Model(john);
    try {
      const result = await UserDAO.create(user);
      expect(result).to.be.an('undefined');
    } catch (e) {
      expect(e).to.exist.any;
    }
  });

  it('User ComparePassword', async () => {
    const _user = await UserDAO.findOne({ email: 'john@catalytic.com' });
    const user = await UserDAO.getUnsafe(_user._id);
    const correct = await user.comparePassword('qwerty');
    const wrong = await user.comparePassword('asd');
    expect(correct).to.be.eql(true);
    expect(wrong).to.be.eql(false);
  });

  it('User generateAuthToken', async () => {
    const user = await UserDAO.findOne({ email: 'john@catalytic.com' });
    const token = await user.generateAuthToken();

    const data = jwt.verify(token, process.env.JWT_SECRET);

    expect(data._id).to.be.a('string');
    expect(data.firstName).to.be.a('string');
    expect(data.lastName).to.be.a('string');
    expect(data.email).to.be.a('string');
    expect(data.iat).to.be.a('number');
    expect(data.exp).to.be.a('number');
  });

  it('Remove User', async () => {
    const userData = UserDAO.Model({
      firstName: 'Remove',
      lastName: 'Delete',
      email: 'remove@catalytic.com',
      password: '123456',
    });
    const user = await UserDAO.create(userData);

    const result = await UserDAO.remove(user._id);

    expect(result).to.be.exist;
  });
}
