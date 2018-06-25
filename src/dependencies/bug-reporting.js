/*
 * Copyright (C) 2017 The "MysteriumNetwork/mysterion" Authors.
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
import type { Container } from '../app/di'
import os from 'os'
import LogCache from '../app/logging/log-cache'
import {BugReporterMetrics, getMetrics} from '../app/bug-reporting/bug-reporter-metrics'

function bootstrap (container: Container) {
  container.factory(
    'mysteriumProcessLogCache',
    [],
    (): LogCache => {
      return new LogCache()
    }
  )

  container.factory(
    'backendLogCache',
    [],
    (): LogCache => {
      return new LogCache()
    }
  )

  container.factory(
    'bugReporterMetrics',
    [],
    (): BugReporterMetrics => new BugReporterMetrics()
  )

  const extendedProcess = (process: { type?: string })
  container.service(
    'bugReporter.config',
    ['mysterionReleaseID', 'mysteriumProcessLogCache', 'backendLogCache', 'bugReporterMetrics'],
    (mysterionReleaseID, mysteriumProcessLogCache, backendLogCache, bugReporterMetrics): RavenOptions => {
      return {
        captureUnhandledRejections: true,
        release: mysterionReleaseID,
        tags: {
          environment: process.env.NODE_ENV || '',
          process: extendedProcess.type || '',
          electron: process.versions.electron || '',
          chrome: process.versions.chrome || '',
          platform: os.platform(),
          platform_release: os.release()
        },
        dataCallback: (data) => {
          const metrics = getMetrics(bugReporterMetrics)
          Object.assign(data.tags, metrics.tags)
          Object.assign(data.extra, metrics.extra)
          data.extra.logs = {
            mysterium_process: mysteriumProcessLogCache.getSerialized(),
            backend: backendLogCache.getSerialized()
          }
          return data
        },
        autoBreadcrumbs: {
          console: true
        }
      }
    }
  )
}

export default bootstrap
