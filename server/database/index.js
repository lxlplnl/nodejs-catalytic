/* eslint-disable no-console */
import mongoose from 'mongoose';
import User from './models/user';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};

mongoose.connection
  .once('open', () => console.info('Connected!'))
  .on('error', error => {
    console.error('Error : ', error);
  });
const models = { User };
export { connectDb };

export default models;
