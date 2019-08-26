# Node Interview

This spec outlines a simple `StatsFetcher` that fetches and parses JSON. The
tests are designed to be progress from very easy to slightly more substance.

## Skill/Knowledge Coverage
This should cover basic sanity checks and proxy knowledge like Promises,
classes, timers, handling API responses.

Tests for adding throttling will provide some minor quality and style checking,
but not too much. The retry test can be worked/talked through last, time
permitting, to get a better idea of this.

## Instructions
Run the test suite with `jest --watchAll`, remove the `.skip` call from tests
one-by-one and work with the candidate to get each one passing in order. Async
errors may be a bit hard to read with Jest, so don't hesitate to coach a bit
more through those.

## Todo
- Add an example of retry functionality
- Substite retry functionality with better quality check tests
