// @flow

class Runtime {
  constructor (window) {

  }

  start () {
    if (this.features.arePaymentsEnabled()) {
      this.startRegistrationFetcher()
      this.registrationFetcher.start()
    }

    this.proposalFetcher.start()
    this.process.start()
    this.monitoring.start()
  }

  stop () {
    this.proposalFetcher.stop()
    this.process.stop()
    this.monitoring.stop()
  }
}
