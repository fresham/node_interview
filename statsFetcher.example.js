module.exports = class StatsFetcher {
  constructor(url) {
    this.url = url;
    this.lastFetch = null;
    this.throttleInterval = 60000; // 60 seconds
  }

  fetch() {
    return new Promise((resolve, reject) => {
      if (!this.isThrottled()) {
        this.lastFetch = Date.now();
        fetch(this.url)
          .then(response => {
            resolve(JSON.parse(response));
          })
          .catch(reject);
      } else {
        reject('#fetch is throttled');
      }
    });
  }

  isThrottled() {
    return this.lastFetch !== null && this.timeSinceLastFetch() < this.throttleInterval;
  }

  timeSinceLastFetch() {
    return Date.now() - (this.lastFetch || 0);
  }
};
