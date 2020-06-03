import * as bcrypt from 'bcrypt';
import Joi from '@hapi/joi';
import * as jwt from 'jsonwebtoken';
import mongoose from '../index';

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      index: { unique: true },
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
  },
);

UserSchema.pre('save', function(next) {
  const user = this;

  if (!user.isModified('password')) return next();

  bcrypt
    .genSalt(10)
    .then(salt => {
      return bcrypt.hash(user.password, salt);
    })
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
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

UserSchema.methods.generateAuthToken = function() {
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

UserSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model('User', UserSchema);

export function validate(user) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
    firstName: Joi.string()
      .min(2)
      .max(255)
      .required(),
    lastName: Joi.string()
      .min(2)
      .max(255)
      .required(),
  });

  return schema.validate(user);
}

export function validateLogin(credentials) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
  });

  return schema.validate(credentials);
}

export default User;
