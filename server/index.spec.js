import { expect } from 'chai';
import { spy } from 'sinon';
import { describe, it } from 'mocha';

describe('true or false', () => {
  it('true is true', () => {
    expect(true).to.eql(true);
  });
  it('false is false', () => {
    expect(false).to.eql(false);
  });
});

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
