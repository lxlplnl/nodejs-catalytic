/* eslint-disable no-console */
import { Mongoose } from 'mongoose';

const mongoose = new Mongoose({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once('open', () => console.info('Connected!'))
  .on('error', error => {
    console.error('Error : ', error);
  });

export const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

export default mongoose;
