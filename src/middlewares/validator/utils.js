import * as DataObjectParser from 'dataobject-parser';

export const getValidationError = error => {
  const validationError = error.details
    .map(d => ({ [d.context.label]: d.message }))
    .reduce((result, item) => {
      if (typeof item === 'object') {
        Object.keys(item).forEach(key => {
          if (!result[key]) result[key] = [];
          result[key].push(item[key]);
        });
      }
      return result;
    }, {});

  return DataObjectParser.transpose(validationError).data();
};

