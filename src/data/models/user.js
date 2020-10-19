import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import mongoosePaginate from 'mongoose-paginate-v2';

const _UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
    firstName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

_UserSchema.pre('save', function (next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt
    .genSalt(10)
    .then((salt) => {
      return bcrypt.hash(user.password, salt);
    })
    .then((hash) => {
      user.password = hash;
      next();
    })
    .catch((err) => next(err));
});

_UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

_UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' },
  );
};
_UserSchema.index({ email: 1 }, { unique: true, background: false });
_UserSchema.plugin(mongoosePaginate);

export const UserSchema = _UserSchema;
export const User = mongoose.model('User', _UserSchema);
