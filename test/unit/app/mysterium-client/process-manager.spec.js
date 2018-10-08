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

import { describe, expect, it } from '../../../helpers/dependencies'
import ProcessManager from '../../../../src/app/mysterium-client/process-manager'
import type { Installer, Process } from '../../../../src/libraries/mysterium-client'
import type {
  DownCallback,
  Monitoring,
  StatusCallback,
  UpCallback
} from '../../../../src/libraries/mysterium-client/monitoring'
import type { VersionCheck } from '../../../../src/libraries/mysterium-client/version-check'
import type { LogCache } from '../../../../src/app/logging/log-cache'
import { buildMainCommunication } from '../../../../src/app/communication/main-communication'
import FakeMessageBus from '../../../helpers/fake-message-bus'
import TequilapiVersionCheck from '../../../../src/libraries/mysterium-client/version-check'
import EmptyTequilapiClientMock from '../../renderer/store/modules/empty-tequilapi-client-mock'
import NodeBuildInfoDTO from 'mysterium-tequilapi/lib/dto/node-build-info'

class InstallerMock implements Installer {
  needsInstallationMock: boolean = false
  installInvoked: boolean = false

  async needsInstallation (): Promise<boolean> {
    return this.needsInstallationMock
  }

  async install (): Promise<void> {
    this.installInvoked = true
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

  onStatusUp (callback: UpCallback): void {
  }

  onStatusDown (callback: DownCallback): void {
  }

  isStarted (): boolean {
    return true
  }
}

class LogCacheMock implements LogCache {
  pushToLevel (level: LogLevel, data: any): void {
  }
}

class VersionCheckMock implements VersionCheck {
  async runningVersionMatchesPackageVersion (): Promise<boolean> {
    return true
  }
}

class VersionTequilapiClientMock extends EmptyTequilapiClientMock {
  async healthCheck (_timeout: ?number) {
    return {
      uptime: '',
      process: 0,
      version: '1.0.0',
      buildInfo: new NodeBuildInfoDTO({})
    }
  }
}

describe('ProcessManager', () => {
  const monitoring = new MonitoringMock()
  const installer = new InstallerMock()
  const process = new ProcessMock()
  const logCache = new LogCacheMock()
  const versionCheck = new VersionCheckMock()
  const communication = buildMainCommunication(new FakeMessageBus())

  const processManager = new ProcessManager(
    installer,
    process,
    monitoring,
    communication,
    logCache,
    versionCheck
  )

  describe('.ensureInstallation', () => {
    it('installs when process needs installation', async () => {
      installer.needsInstallationMock = true
      await processManager.ensureInstallation()
      expect(installer.installInvoked).to.be.true
    })
  })

  describe('.runningVersionMatchesPackageVersion', () => {
    it('returns true when healthcheck version matches', async () => {
      const tequilapiClient = new VersionTequilapiClientMock()
      const versionCheck = new TequilapiVersionCheck(tequilapiClient, '1.0.0')
      expect(await versionCheck.runningVersionMatchesPackageVersion()).to.be.true
    })
  })
})
