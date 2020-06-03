import 'dotenv/config';
import { describe } from 'mocha';
import userTests from './user.test';

export default function() {
  describe('User Routes', userTests);
}
