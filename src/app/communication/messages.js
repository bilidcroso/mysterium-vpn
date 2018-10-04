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

// TODO: rename to messages.js
export default {
  // async messages
  CONNECTION_STATUS_CHANGED: 'connection.status.changed',
  CONNECTION_REQUEST: 'connection.request',
  CONNECTION_CANCEL: 'connection.cancel',
  RECONNECT_REQUEST: 'reconnect.request',

  CURRENT_IDENTITY_CHANGED: 'current.identity.changed',

  TERMS_REQUESTED: 'terms.requested',
  TERMS_ANSWERED: 'terms.answered',
  TERMS_ACCEPTED: 'terms.accepted',

  RENDERER_BOOTED: 'renderer.booted',
  RENDERER_SHOW_ERROR: 'renderer.show-error',

  HEALTHCHECK_UP: 'healthcheck.up',
  HEALTHCHECK_DOWN: 'healthcheck.down',

  PROPOSALS_UPDATE: 'proposals.update',
  COUNTRY_UPDATE: 'country.update',

  IDENTITY_REGISTRATION: 'identity.registration',

  TOGGLE_FAVORITE_PROVIDER: 'toggle.favorite.provider',
  SHOW_DISCONNECT_NOTIFICATION: 'show.disconnect.notification',

  USER_SETTINGS: 'user.settings',
  USER_SETTINGS_REQUEST: 'user.settings.request',
  USER_SETTINGS_UPDATE: 'user.settings.update',

  // sync messages
  GET_SESSION_ID: 'GET_SESSION_ID',
  GET_SERIALIZED_CACHES: 'GET_SERIALIZED_CACHES',
  SEND_METRIC: 'SEND_METRIC',
  GET_METRICS: 'GET_METRICS',
  LOG: 'LOG'
}
