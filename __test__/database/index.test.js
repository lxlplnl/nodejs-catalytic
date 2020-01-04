/* eslint-disable no-console */
import 'dotenv/config';
import mongoose from 'mongoose';
import { expect } from 'chai';
import User from '../../server/database/models/user';

describe('Database Tests', () => {
  before(function(done) {
    mongoose.connect(process.env.TEST_DATABASE_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      db.dropDatabase();
      console.log('   We are connected to test database!');
      done();
    });
  });

  describe('Test Database', () => {
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

    it('Should retrieve data from test database', () => {
      User.find({ email: 'mike@horsepower.at' }).then(user => {
        expect(user).to.have.lengthOf(1);
      });
    });

    it('Dont save incorrect format to database', async () => {
      // Attempt to save with wrong info. An error should trigger
      const wrongSave = User({
        firstName: 'Mahmut',
        lastName: 'Horsepower',
        email: 'mike@horsepower.at',
        password: '123456',
      });
      try {
        const user = await wrongSave.save();
        expect(user).to.be.an('undefined');
      } catch (e) {
        expect(e).to.exist.any;
      }
    });
  });

  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});
