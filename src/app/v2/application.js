// @flow

import Window from '../window'
import type { BasicApplication } from './kernel'
import { app } from 'electron'

class Application implements BasicApplication {
  _window: Window
  _runtime: Runtime

  constructor (window: Window, runtime: Runtime) {
    this._window = window
    this._runtime = runtime
  }

  start (): void {
    this._bindReadyEvent()
    this._bindWillQuitEvent()
    this._bindWindowsClosedEvent()
    this._bindActivateEvent()
  }

  quit (): void {
    app.quit()
  }

  _bindReadyEvent (): void {
    app.on('ready', () => {
      this._runtime.start()
    })
  }

  _bindWindowsClosedEvent (): void {
    app.on('window-all-closed', () => {
      if (process.platform !== 'darwin') {
        this.quit()
      }
    })
  }

  _bindWillQuitEvent (): void {
    app.on('will-quit', () => {
      this._runtime.stop()
    })
  }

  _bindActivateEvent (): void {
    app.on('activate', () => {
      this._window.show()
    })
  }

  isRunning (): boolean {
    return app.makeSingleInstance()
  }
}

export default Application
