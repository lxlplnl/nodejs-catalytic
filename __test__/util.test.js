import 'dotenv/config';
import { expect } from 'chai';
import { describe, it } from 'mocha';
import { isValidEnv } from '../server/util';

describe('Util Function Tests', () => {
  it('Env must be valid', () => {
    expect(isValidEnv()).to.eql(true);
    expect(process.env.JWT_SECRET).to.exist.string;
    expect(process.env.DATABASE_URL).to.exist.string;
    expect(process.env.TEST_DATABASE_URL).to.exist.string;
  });
});
