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

import size from 'file-size'

type BytesReadable = {
  amount: string,
  units: string
}

/**
 * @function
 * @param {number} bytes
 * @returns {{amount:number,units:string}} result - holds amount and units
 * @throws if argument is null
 */

function formatBytesReadable (bytes: number): BytesReadable {
  if (typeof bytes !== 'number') {
    throw new Error('provide valid input for conversion')
  }
  const calculated = size(bytes).calculate('jedec')
  return {
    amount: calculated.fixed,
    units: calculated.suffix.replace('i', '')
  }
}

const bytesReadableDefault: BytesReadable = { amount: '-', units: 'KB' }

function formatBytesReadableOrDefault (bytes: number): BytesReadable {
  try {
    return formatBytesReadable(bytes)
  } catch (err) {
    return bytesReadableDefault
  }
}

/**
 * @function
 * @param {number} seconds
 * @returns {string} readable in --:--:-- format
 * @throws {Error} if argument is null
 */
function formatTimeDisplay (seconds: number): string {
  if (typeof seconds !== 'number' || seconds < 0) {
    throw new Error('invalid input')
  }
  let h = Math.floor(seconds / 3600)
  h = h > 9 ? h : '0' + h
  let m = Math.floor((seconds % 3600) / 60)
  m = m > 9 ? m : '0' + m
  let s = (seconds % 60)
  s = s > 9 ? s : '0' + s
  return `${h}:${m}:${s}`
}

const timeDisplayDefault = '--:--:--'

function formatTimeDisplayOrDefault (seconds: number): string {
  try {
    return formatTimeDisplay(seconds)
  } catch (err) {
    return timeDisplayDefault
  }
}

export {
  formatBytesReadableOrDefault,
  formatBytesReadable,
  formatTimeDisplayOrDefault,
  formatTimeDisplay
}
