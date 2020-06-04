import 'dotenv/config';
import { expect } from 'chai';
import { describe, it } from 'mocha';

describe('Util Function Tests', () => {
  it('Env must be valid', () => {
    expect(process.env.JWT_SECRET).to.exist.string;
    expect(process.env.DATABASE_URL).to.exist.string;
    expect(process.env.TEST_DATABASE_URL).to.exist.string;
  });
});
