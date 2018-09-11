// @flow

import type { Hook } from '../kernel'
import StartupEventTracker from '../../statistics/startup-event-tracker'

class InitializeCommunicationCallbacksHook implements Hook {
  _eventTracker: StartupEventTracker

  constructor (eventSender: StartupEventTracker) {
    this._eventTracker = eventSender
  }

  handle (): boolean {
    this._eventTracker.sendAppStartEvent()

    return true
  }
}

export default InitializeCommunicationCallbacksHook
