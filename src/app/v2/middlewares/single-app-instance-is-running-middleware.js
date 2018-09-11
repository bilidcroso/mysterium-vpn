// @flow

import type { ElectronApplication, Middleware } from '../kernel'

class SingleAppInstanceIsRunningHook implements Middleware {
  _app: ElectronApplication

  constructor (app: ElectronApplication) {
    this._app = app
  }

  handle (): boolean {
    return this._app.isAlreadyRunning()
  }
}

export default SingleAppInstanceIsRunningHook
