/*
 * Copyright (C) 2017 The "mysteriumnetwork/mysterium-vpn" Authors.
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
import { remote } from 'electron'
import type { Container } from '../../../app/di'
import BugReporterRenderer from '../../../app/bug-reporting/bug-reporter-renderer'
import { FeedbackForm } from '../../../app/bug-reporting/feedback-form'
import RavenJs from 'raven-js'
import Vue from 'vue'
import RavenVue from 'raven-js/plugins/vue'
import RendererEnvironmentCollector from '../../../app/bug-reporting/environment/renderer-environment-collector'
import type { EnvironmentCollector } from '../../../app/bug-reporting/environment/environment-collector'
import SyncSenderRendererCommunication from '../../../app/communication/sync/sync-renderer-communication'
import { SyncIpcSender } from '../../../app/communication/sync/sync-ipc'
import type { SyncRendererCommunication } from '../../../app/communication/sync/sync-communication'
import { createWinstonSyncComLogger } from '../../../app/logging/winston'
import { BugReporterMetricsProxy } from '../../../app/bug-reporting/metrics/bug-reporter-metrics-proxy'
import type { BugReporterMetrics } from '../../../app/bug-reporting/metrics/bug-reporter-metrics'

function bootstrap (container: Container) {
  container.constant('bugReporter.sentryURL', 'https://f1e63dd563c34c35a56e98aa02518d40@sentry.io/300978')

  container.factory(
    'logger',
    ['syncCommunication'],
    (syncCommunication: SyncRendererCommunication) => {
      const logPath = remote.app.getPath('userData')
      return createWinstonSyncComLogger(syncCommunication, logPath)
    }
  )
  container.factory(
    'bugReporter',
    ['bugReporter.raven'],
    (raven) => {
      const bugReporter = new BugReporterRenderer(raven)
      window.addEventListener('unhandledrejection', (evt) => {
        bugReporter.captureErrorMessage(evt.reason, evt.reason.response ? evt.reason.response.data : evt.reason)
      })
      return bugReporter
    }
  )

  container.factory(
    'bugReporterMetrics',
    ['syncCommunication'],
    (syncCommunication: SyncRendererCommunication): BugReporterMetrics => {
      return new BugReporterMetricsProxy(syncCommunication)
    }
  )

  container.service(
    'bugReporter.raven',
    ['bugReporter.sentryURL', 'bugReporter.config'],
    (sentryURL, config) => {
      return RavenJs
        .config(sentryURL, config)
        .install()
        .addPlugin(RavenVue, Vue)
    }
  )

  container.service(
    'syncCommunication',
    [],
    (): SyncRendererCommunication => {
      const sender = new SyncIpcSender()
      return new SyncSenderRendererCommunication(sender)
    }
  )

  container.service(
    'environmentCollector',
    ['mysteriumVpnReleaseID', 'syncCommunication', 'bugReporterMetrics'],
    (
      mysteriumVpnReleaseID: string,
      syncCommunication: SyncRendererCommunication,
      bugReporterMetrics: BugReporterMetrics): EnvironmentCollector => {
      return new RendererEnvironmentCollector(mysteriumVpnReleaseID, syncCommunication, bugReporterMetrics)
    }
  )

  container.constant('feedbackForm.email', 'vpn.feedback@mysterium.network')

  container.service(
    'feedbackForm',
    ['bugReporter.raven', 'feedbackForm.email'],
    (raven, email) => new FeedbackForm(raven, email)
  )
}

export default bootstrap
