import { describe } from 'mocha';
import mongoose, { connectDb } from '../server/database';
import databaseTests from './database/index.test';
import routeTests from './routes/index.test';

describe('Tests', () => {
  before(async () => {
    await connectDb().then(() => mongoose.connection.dropDatabase());
  });

  describe('Database Tests', databaseTests);
  describe('Route Tests', routeTests);

  after(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
