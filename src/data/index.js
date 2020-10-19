/* eslint-disable no-console */
import mongoose from 'mongoose';

mongoose.connection
  .once('open', () => console.info('Connected!'))
  .on('error', (error) => {
    console.error('Error : ', error);
  });

export const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    // https://mongoosejs.com/docs/deprecations.html#
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};
