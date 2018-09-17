// @flow

class Runtime {
  constructor (window) {

  }

  start () {
    this.proposalFetcher.start()
    this.process.start()
    this.monitoring.start()
  }

  stop () {
    // stop all fetchers
  }
}
