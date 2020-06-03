import Joi from '@hapi/joi';

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
