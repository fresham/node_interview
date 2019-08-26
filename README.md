# Node Interview

This spec outlines a simple `StatsFetcher` that fetches and parses JSON. The
tests are designed to be progress from very easy to slightly more substance.

## Skill/Knowledge Coverage
This should cover basic sanity checks and proxy knowledge like Promises,
classes, timers, handling API responses.

Test cases for throttling will provide some minor quality and style checking,
but not too much. The retry test can be worked/talked through last, time
permitting, to get a better idea of this.

## Instructions
1. clone the repository
2. copy `statsFetcher.example.js` to `statsFetcher.js` and run tests to ensure
   that they pass; reset `statsFetcher.js`
3. run the test suite with `jest --watchAll`
4. remove the `.skip` call from tests one-by-one and work with the candidate to
   get each one passing in order by modifying `statsFetcher.js`.

Refer to `statsFetcher.example.js` for an example passing implementation. Async
errors can be a bit hard to read with Jest, so don't hesitate to offer a little
extra help here.

## Todo
- Add an example of retry functionality
- Substite retry functionality with better quality check tests
- Refactor runner to be able to check tests without moving files around
