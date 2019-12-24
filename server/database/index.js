import mongoose from 'mongoose';
import User from './models/user';

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
};
const models = { User };
export { connectDb };

export default models;
