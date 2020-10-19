import { describe } from 'mocha';
import unauthenticatedTests from './unauthenticated.test';
import meTest from './me.test';

export default function () {
  describe('Unauthenticated Routes', unauthenticatedTests);
  describe('Me Routes', meTest);
}
