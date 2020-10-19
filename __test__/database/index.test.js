import { describe } from 'mocha';
import modelTests from './models/index.test';
import validationTests from './validations/index.test';

export default function () {
  describe('Model Tests', modelTests);
  describe('Validation Tests', validationTests);
}
