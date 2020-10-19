import Joi from '@hapi/joi';

export const ObjectId = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
