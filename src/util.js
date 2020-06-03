/* eslint-disable no-console */
import 'dotenv/config';

export function isValidEnv() {
  if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined.');
    return false;
  }
  if (!process.env.DATABASE_URL) {
    console.error('FATAL ERROR: DATABASE_URL is not defined.');
    return false;
  }
  if (!process.env.TEST_DATABASE_URL) {
    console.error('FATAL ERROR: TEST_DATABASE_URL is not defined.');
    return false;
  }
  return true;
}
