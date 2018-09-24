// @flow

// 2. make only single instance running
// 1. app startup event statistics
// 5. initialize communication callbacks
// 6. log unhandled exceptions
// 3. set logger
// 4. set session id
// 7. app on ready -> bootstrap()
// 8. app on window-all-closed
// 9. app on will-quit
// 10. app on activate
// 11. app before quit

import Kernel from './kernel'
import Application from './application'
import SingleAppInstanceIsRunningHook from './middlewares/single-app-instance-is-running-middleware'
import SendStartupEventHook from './middlewares/send-startup-event-middleware'
import logger from '../logger'
import type { ProposalFetcher } from '../data-fetchers/proposal-fetcher'

const runtime = new Runtime()
runtime.add(new Tray())
runtime.add(new ProposalFetcher())
runtime.add(new ProcessManager())

const app = new Application(runtime, logger)
app.setLogger(new Logger())
app.setSessionId(Math.rand())

const kernel = new Kernel(app)
const window = new Window()
kernel.registerBootLoaders(new SendStartupEventHook())
kernel.registerBootLoaders(new InitializeCommunicationCallbacksHook())
kernel.registerBootLoaders(new LogUnhandledExceptions())

try {
  kernel.bootstrap()
} catch (e) {
  const handler = new ExceptionHandler(e)
  handler.handle()
}

