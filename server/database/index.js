/* eslint-disable no-console */
import mongoose from 'mongoose';

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

export default { connectDb };
