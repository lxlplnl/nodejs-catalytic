import { expect } from 'chai';
import { spy } from 'sinon';
import { describe, it } from 'mocha';

function callMyFunction(callback) {
  callback();
}

describe('callMyFunction function', () => {
  it('callback function called', () => {
    const callback = spy();
    callMyFunction(callback);
    expect(callback.called).to.eql(true);
  });
});
