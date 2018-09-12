// @flow

import type { BasicApplication, Middleware } from '../kernel'

class SingleAppInstanceIsRunningHook implements Middleware {
  _app: BasicApplication

  constructor (app: BasicApplication) {
    this._app = app
  }

  handle (): ?boolean {
    if (this._app.isRunning()) {
      return this._app.quit()
    }

    this._showWindowIfAvailable()
  }

  _showWindowIfAvailable () {
    if (this._window.exists()) {
      this._window.show()
    }
  }
}

export default SingleAppInstanceIsRunningHook
