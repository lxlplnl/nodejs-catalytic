import { expect } from 'chai';
import { spy } from 'sinon';
import { describe, it } from 'mocha';
import uuidMV from '../../src/middlewares/uuidMV';

describe('Uuid Middleware Testing', () => {
  it('uuidMV', () => {
    const callback = spy();
    const req = {};
    uuidMV(req, undefined, callback);

    expect(callback.called).to.eql(true);
    expect(req.id).to.be.a('string');
  });
});
