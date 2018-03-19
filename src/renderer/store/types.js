import connectionStatus from './connectionStatus'

export default {
  tequilapi: connectionStatus,
  // Mutations
  SHOW_ERROR: 'SHOW_ERROR',
  SHOW_ERROR_MESSAGE: 'SHOW_ERROR_MESSAGE',

  INIT_SUCCESS: 'INIT_SUCCESS',
  INIT_PENDING: 'INIT_PENDING',
  INIT_FAIL: 'INIT_FAIL',
  INIT_NEW_USER: 'INIT_NEW_USER',

  IDENTITY_GET_SUCCESS: 'IDENTITY_GET_SUCCESS',
  IDENTITY_LIST_SUCCESS: 'IDENTITY_LIST_SUCCESS',

  PROPOSAL_LIST_SUCCESS: 'PROPOSAL_LIST_SUCCESS',

  LOG_INFO: 'LOG_INFO',
  LOG_ERROR: 'LOG_ERROR',
  HEALTHCHECK_SUCCESS: 'HEALTHCHECK_SUCCESS',

  MYST_PROCESS_RUNNING: 'MYST_PROCESS_RUNNING',

  IDENTITY_UNLOCK_SUCCESS: 'IDENTITY_UNLOCK_SUCCESS',
  IDENTITY_UNLOCK_PENDING: 'IDENTITY_UNLOCK_PENDING',
  IDENTITY_UNLOCK_FAIL: 'IDENTITY_UNLOCK_FAIL',

  HIDE_ERROR: 'HIDE_ERROR',

  CONNECTION_STATISTICS_RESET: 'CONNECTION_STATISTICS_RESET',

  SET_ACTION_LOOPER: 'SET_ACTION_LOOPER',
  REMOVE_ACTION_LOOPER: 'REMOVE_ACTION_LOOPER',

  // Mutation + action
  CLIENT_BUILD_INFO: 'CLIENT_BUILD_INFO',
  CONNECTION_STATISTICS: 'CONNECTION_STATISTICS',
  CONNECTION_IP: 'CONNECTION_IP',
  SET_CONNECTION_STATUS: 'SET_CONNECTION_STATUS',

  // Actions
  IDENTITY_CREATE: 'IDENTITY_CREATE',
  IDENTITY_LIST: 'IDENTITY_LIST',
  IDENTITY_UNLOCK: 'IDENTITY_UNLOCK',

  FETCH_CONNECTION_STATUS: 'FETCH_CONNECTION_STATUS',
  PROPOSAL_LIST: 'PROPOSAL_LIST',

  CONNECT: 'CONNECT',
  DISCONNECT: 'DISCONNECT',
  SET_VISIBLE_STATUS: 'SET_VISIBLE_STATUS',

  START_ACTION_LOOPING: 'START_ACTION_LOOPING',
  STOP_ACTION_LOOPING: 'STOP_ACTION_LOOPING',

  SET_NAV_OPEN: 'SET_NAV',
  SET_NAV_VISIBLE: 'SET_NAV_VISIBLE',
  SET_VISUAL: 'SET_VISUAL',

  OVERLAY_ERROR: 'OVERLAY_ERROR',
  ERROR_IN_RENDERER: 'ERROR_IN_RENDERER',

  TERMS: 'TERMS'
}
