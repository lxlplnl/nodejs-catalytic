import mongoose from 'mongoose';
import { describe } from 'mocha';
import { connectDb } from '../src/data';
import databaseTests from './database/index.test';
import routeTests from './routes/index.test';
import { initApp } from '../src';

describe('Tests', () => {
  before(async function () {
    this.timeout(25000);
    await connectDb()
      .then(() => mongoose.connection.dropDatabase())
      .then(() => initApp());
  });

  describe('Database Tests', databaseTests);
  describe('Route Tests', routeTests);

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
