/*
 * Copyright (C) 2018 The "mysteriumnetwork/mysterium-vpn" Authors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// @flow

import { beforeEach, describe, expect, it } from '../../../helpers/dependencies'
import ProcessManager from '../../../../src/app/mysterium-client/process-manager'
import type { Installer, Process } from '../../../../src/libraries/mysterium-client'
import type {
  Monitoring,
  StatusCallback,
  EmptyCallback
} from '../../../../src/libraries/mysterium-client/monitoring'
import type { VersionCheck } from '../../../../src/libraries/mysterium-client/version-check'
import { buildMainCommunication } from '../../../../src/app/communication/main-communication'
import LogCache from '../../../../src/app/logging/log-cache'
import FeatureToggle from '../../../../src/app/features/feature-toggle'
import { buildRendererCommunication } from '../../../../src/app/communication/renderer-communication'
import { CallbackRecorder } from '../../../helpers/utils'
import DirectMessageBus from '../../../helpers/direct-message-bus'

class InstallerMock implements Installer {
  needsInstallationMock: boolean = false
  installInvoked: boolean = false
  installFails: boolean = false

  async needsInstallation (): Promise<boolean> {
    return this.needsInstallationMock
  }

  async install (): Promise<void> {
    this.installInvoked = true
    if (this.installFails) {
      throw new Error('Mock install error')
    }
  }
}

class ProcessMock implements Process {
  async start (): Promise<void> {
  }

  async repair (): Promise<void> {
  }

  async stop (): Promise<void> {
  }

  async kill (): Promise<void> {
  }

  onLog (level: string, callback: Function): void {
  }

  async setupLogging (): Promise<void> {
  }
}

class MonitoringMock implements Monitoring {
  start (): void {
  }

  stop (): void {
  }

  onStatus (callback: StatusCallback): void {
  }

  onStatusUp (callback: EmptyCallback): void {
  }

  onStatusDown (callback: EmptyCallback): void {
  }

  isStarted (): boolean {
    return true
  }
}

class VersionCheckMock implements VersionCheck {
  async runningVersionMatchesPackageVersion (): Promise<boolean> {
    return true
  }
}

describe('ProcessManager', () => {
  let monitoring
  let installer
  let process
  let logCache
  let versionCheck
  let communication
  let featureToggle

  let processManager

  let remoteCommunication

  beforeEach(() => {
    monitoring = new MonitoringMock()
    installer = new InstallerMock()
    process = new ProcessMock()
    logCache = new LogCache()
    versionCheck = new VersionCheckMock()

    const messageBus = new DirectMessageBus()
    communication = buildMainCommunication(messageBus)
    remoteCommunication = buildRendererCommunication(messageBus)

    featureToggle = new FeatureToggle({})

    processManager = new ProcessManager(
      installer,
      process,
      monitoring,
      communication,
      logCache,
      versionCheck,
      featureToggle
    )
  })

  describe('.ensureInstallation', () => {
    it('installs when process needs it', async () => {
      installer.needsInstallationMock = true
      await processManager.ensureInstallation()
      expect(installer.installInvoked).to.be.true
    })

    it('does not install when process does not need it', async () => {
      installer.needsInstallationMock = false
      await processManager.ensureInstallation()
      expect(installer.installInvoked).to.be.false
    })

    it('sends error message to renderer when installation fails', async () => {
      installer.needsInstallationMock = true
      installer.installFails = true
      const recorder = new CallbackRecorder()
      remoteCommunication.rendererShowError.on(recorder.getCallback())

      await processManager.ensureInstallation()

      expect(recorder.invoked).to.be.true
      expect(recorder.firstArgument).to.eql({ message: 'Failed to install MysteriumVPN.' })
    })
  })

  describe('.start', () => {
    it('does not raise error', async () => {
      await processManager.start()
    })
  })

  describe('.stop', () => {
    it('does not raise error', async () => {
      await processManager.stop()
    })
  })
})
