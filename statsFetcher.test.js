const StatsFetcher = require('./statsFetcher');

let fetcher;
let url = 'https://localhost/stats';
global.fetch = jest.fn();

beforeEach(() => {
  fetcher = new StatsFetcher(url);
});

test('StatsFetcher should store the URL on initialization', () => {
  expect(fetcher.url).toBe(url);
});

test('#fetch call global fetch function with URL', () => {
  fetcher.fetch();
  expect(global.fetch.mock.calls[0][0]).toBe(url);
});

test('#fetch returns a Promise', () => {
  global.fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve('test');
    });
  });

  expect(fetcher.fetch()).resolves.toEqual('test')
  fetcher.fetch().rejects
});

test('#fetch resolves with parsed JSON', () => {
  global.fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve('{ "pings": 1000 }');
    });
  });

  expect.assertions(1);
  return fetcher.fetch()
    .then(response => expect(response).toEqual({ pings: 1000 }));
});

// Errors here are a little confusing for unhandled rejections on either layer
// of Promises
test('#fetch rejects with an error message', () => {
  const expected_error = '500: Internal Server Error';

  global.fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      reject(expected_error);
    });
  });

  expect.assertions(1);
  return expect(fetcher.fetch()).rejects.toBe(expected_error);
});

test.skip('#fetch retries 5 times before rejecting', () => {
});

test.skip('throttle-fetch', () => {
});

test.skip('emit-on-success', () => {
});

test.skip('emit-on-failure', () => {
});
