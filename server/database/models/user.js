import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.pre('save', next => {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err2, hash) => {
      if (err2) return next(err2);

      user.password = hash;
      next();
    });
  });
});

UserSchema.statics.findByLogin = async function(login) {
  let user = await this.findOne({
    username: login,
  });
  if (!user) {
    user = await this.findOne({ email: login });
  }
  return user;
};

const User = mongoose.model('User', UserSchema);

export default User;
