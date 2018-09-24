// @flow

interface Hook {
  handle (): ?boolean
}

interface BasicApplication {
  start (): void,

  isRunning(): boolean,

  quit (): void
}

class Kernel {
  _app: BasicApplication
  _beforeLaunchHooks: Array<Hook>
  _afterLaunchHooks: Array<Hook>

  constructor (app: BasicApplication) {
    this._app = app
  }

  registerBootLoaders (hook: Hook) {
    this._beforeLaunchHooks.push(hook)
  }

  bootstrap () {
    this._runHooks(this._beforeLaunchHooks)
    this._app.start()
  }

  _runHooks (hooks: Array<Hook>) {
    // this could be refactored using first
    // the .first() one that returns false, terminates the app
    hooks.forEach((hook: Hook) => {
      hook.handle()
    })
  }
}

export default Kernel
export type { Hook, BasicApplication }
