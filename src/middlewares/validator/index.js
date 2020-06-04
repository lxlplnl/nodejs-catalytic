import { getValidationError } from './utils';

export const validation = (...validators) => (req, res, next) => {
  for (const item of validators) {
    let validator;
    if (typeof item === 'function') {
      validator = item;
    } else if (typeof item === 'object') {
      validator = item.validator;
      if (item.isCase && !item.isCase(req)) continue;
    } else {
      throw Error('Validator should be object or function');
    }

    const { value, error } = validator(req.body);
    if (error) {
      res.status(400).json({ validationError: getValidationError(error) });
    } else {
      req.body = value;
      next();
    }
    return;
  }
};
