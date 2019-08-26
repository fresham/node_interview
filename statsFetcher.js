class StatsFetcher {
  constructor(url) {
    this.url = url;
  }

  fetch() {
    return new Promise((resolve, reject) => {
      fetch(this.url)
        .then(response => {
          resolve(JSON.parse(response));
        })
        .catch(reject);
        // .catch(error => reject(error));
    });
  }
}

module.exports = StatsFetcher;
