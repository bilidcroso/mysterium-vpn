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

/**
 * Returns a promise that is resolved after processing all currently queued events.
 */
function nextTick (): Promise<void> {
  return new Promise(resolve => process.nextTick(resolve))
}

/**
 * Runs async function and captures error of it's execution.
 */
async function capturePromiseError (promise: Promise<any>): Promise<?Error> {
  try {
    await promise
  } catch (e) {
    return e
  }
  return null
}

function captureError (fn: () => any): ?Error {
  try {
    fn()
  } catch (e) {
    return e
  }
}

/**
 * Resolves promise and captures error of it's execution.
 */
async function captureAsyncError (func: () => Promise<any>) {
  return capturePromiseError(func())
}

/**
 * Records multiple invocations of callback. Useful for asserting that callback was invoked multiple times.
 */
class RepeatableCallbackRecorder {
  _arguments: any[][] = []
  _boundCallback: (any) => void

  /**
   * Returns function, which records its invocation and arguments
   * into current instance.
   *
   * @returns Function
   */
  getCallback (): (any) => void {
    this._boundCallback = this._boundCallback || this._record.bind(this)
    return this._boundCallback
  }

  get invokesCount (): number {
    return this._arguments.length
  }

  get lastArguments (): any[] {
    if (this._arguments.length === 0) {
      throw new Error('Callback of RepeatableCallbackRecorder was not invoked, last arguments are not available.')
    }
    return this._arguments[this._arguments.length - 1]
  }

  _record (...args: any[]): void {
    this._arguments.push(args)
  }
}

/**
 * Records invocation of callback. Useful for asserting that callback was invoked single time.
 */
class CallbackRecorder {
  _arguments: ?Array<any> = null
  _boundCallback: (any) => void

  /**
   * Returns function, which records its invocation and arguments
   * into current instance.
   *
   * @returns Function
   */
  getCallback (): (any) => void {
    this._boundCallback = this._boundCallback || this._record.bind(this)
    return this._boundCallback
  }

  get invoked (): boolean {
    return this._arguments != null
  }

  get firstArgument (): any {
    return this.arguments[0]
  }

  get arguments (): Array<any> {
    if (this._arguments == null) {
      throw new Error('Arguments are not set, even though callback was invoked')
    }
    return this._arguments
  }

  _record (...args: Array<any>): void {
    if (this._arguments != null) {
      throw new Error('Callback of CallbackRecorder already invoked!')
    }
    this._arguments = args
  }
}

export {
  nextTick,
  capturePromiseError,
  captureAsyncError,
  captureError,
  CallbackRecorder,
  RepeatableCallbackRecorder
}
