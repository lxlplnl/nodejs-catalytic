import Joi from '@hapi/joi';
import { ObjectId } from './utils';

const email = Joi.string()
  .min(5)
  .max(255)
  .email({ tlds: { allow: false } });
const password = Joi.string().min(4).max(255);
const namePart = Joi.string().min(2).max(255);

export function validateRegister(data) {
  const schema = Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      email: email.required(),
      password: password.required(),
      firstName: namePart.required(),
      lastName: namePart.required(),
    });

  return schema.validate(data);
}

export function validateUpdate(data) {
  const schema = Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      email,
      firstName: namePart,
      lastName: namePart,
      role: ObjectId,
    });

  return schema.validate(data);
}

export function validateLogin(data) {
  const schema = Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      email: email.required(),
      password: password.required(),
    });

  return schema.validate(data);
}

export function validateUpdatePassword(data) {
  const schema = Joi.object()
    .options({ abortEarly: false, stripUnknown: true })
    .keys({
      password: password.required(),
      newPassword: password.required(),
      confirmPassword: Joi.ref('newPassword'),
    });

  return schema.validate(data);
}
