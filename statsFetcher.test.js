'use strict';

jest.useFakeTimers();

const StatsFetcher = require('./statsFetcher');
const OriginalDateNow = Date.now;

let fetcher;
let url = 'https://localhost/stats';
let jsonResponse = '{ "pings": 1000 }';

beforeEach(() => {
  Date.now = OriginalDateNow;
  global.fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(jsonResponse);
    });
  });

  jsonResponse = '{ "pings": 1000 }';
  fetcher = new StatsFetcher(url);
});


test('StatsFetcher stores the URL on initialization', () => {
  expect(fetcher.url).toBe(url);
});


test.skip('#fetch returns a Promise', () => {
  const pass = () => { expect(true).toBeTruthy() };
  jsonResponse = '{}';
  expect.assertions(1);
  return fetcher.fetch().then(pass).catch(pass);
});


test.skip('#fetch rejects with an error message', () => {
  const expected_error = '500: Internal Server Error'; 

  global.fetch = jest.fn(() => {
    return new Promise((resolve, reject) => {
      reject(expected_error);
    });
  });

  expect.assertions(1);
  return expect(fetcher.fetch()).rejects.toBe(expected_error);
});


test.skip('#fetch calls global fetch function with URL', () => {
  return fetcher.fetch()
    .then(response => {
      expect(global.fetch.mock.calls[0][0]).toBe(url);
    })
    .catch();
});


test.skip('#fetch resolves with values from parsed JSON resopnse', () => {
  expect.assertions(1);
  return fetcher.fetch()
    .then(response => expect(response).toEqual({ pings: 1000 }));
});


test.skip('#timeSinceLastFetch returns seconds since last fetch', async () => {
  const start = Date.now();
  await fetcher.fetch();
  jest.advanceTimersByTime(30000);
  Date.now = jest.fn(() => start + 30000)
  expect(fetcher.timeSinceLastFetch()).toBe(30000);
});


// Avoid `new Date()`, other timers are covered
test.skip('#fetch is throttled to once per minute', async () => {
  const start = Date.now();
  Date.now = jest.fn(() => start)

  // This could be refactored once design is final
  await fetcher.fetch();

  jest.advanceTimersByTime(30000);
  Date.now = jest.fn(() => start + 30000)
  await expect(fetcher.fetch()).rejects.toBe('#fetch is throttled');

  jest.advanceTimersByTime(40000);
  Date.now = jest.fn(() => start + 70000)
  await expect(fetcher.fetch()).resolves.toEqual({ pings: 1000 });
});


// Might be difficult to work through in time
//
// test.skip('#fetch retries 5 times before rejecting', () => {
//   const expected_error = '500: Internal Server Error';
// 
//   global.fetch = jest.fn(() => {
//     return new Promise((resolve, reject) => {
//       resolve('{ "pings": 1000 }');
//     });
//   });
// 
//   expect.assertions(1);
//   return fetcher.fetch()
//     .then(response => expect(global.fetch.mock.calls.length).toBe(5));
// });
