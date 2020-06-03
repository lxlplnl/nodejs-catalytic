import { expect } from 'chai';
import User from '../../src/database/models/user';

export default function() {
  it('New user saved to test database', async () => {
    const validUser = User({
      firstName: 'Mahmut',
      lastName: 'Horsepower',
      email: 'mike@horsepower.at',
      password: '123456',
    });
    const user = await validUser.save();
    expect(user.firstName).to.be.eql('Mahmut');
    expect(user.lastName).to.be.eql('Horsepower');
    expect(user.email).to.be.eql('mike@horsepower.at');
    expect(user.password).to.be.not.eql('123456');
  });
}
