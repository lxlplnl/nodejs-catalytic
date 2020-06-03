import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

dotenvExpand(dotenv.config());

(function() {
  if (!process.env.DATABASE_URL)
    throw Error('Required env : DATABASE_URL : string');
  if (!process.env.TEST_DATABASE_URL)
    throw Error('Required env : TEST_DATABASE_URL : string');
  if (!process.env.JWT_SECRET)
    throw Error('Required env : JWT_SECRET : string');

  if (process.env.NODE_ENV === 'test') {
    process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;
    process.env.PORT = 5001;
  }
})();
