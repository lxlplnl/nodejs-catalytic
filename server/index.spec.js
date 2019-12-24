import { spy } from 'sinon';

test('true or false', () => {
  expect(true).toBe(true);
  expect(false).toBe(false);
});

function callMyFunction(callback) {
  callback();
}

test('callMyFunction function', () => {
  const callback = spy();
  callMyFunction(callback);
  expect(callback.called).toBe(true);
});
