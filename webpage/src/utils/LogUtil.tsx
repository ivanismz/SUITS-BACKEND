/* eslint-disable no-console */
import { ValueOf } from './TypeUtils'

const LOG_IMPORTANCE = {
  DEBUG: 2,
  ERROR: 5,
  INFO: 3,
  NONE: 6,
  VERBOSE: 1,
  WARN: 4,
}

const LOG_LEVEL =
  process.env.NODE_ENV === 'production'
    ? LOG_IMPORTANCE.NONE
    : LOG_IMPORTANCE.INFO

const COLOR_KEYS = {
  BLACK: '\u001B[30m',
  BLUE: '\u001B[34m',
  CYAN: '\u001B[36m',
  GREEN: '\u001B[32m',
  MAGENTA: '\u001B[35m',
  RED: '\u001B[31m',
  WHITE: '\u001B[37m',
  YELLOW: '\u001B[33m',
}

const LogUtil = {
  debug: (message: unknown, tag = '') => {
    if (LOG_LEVEL <= LOG_IMPORTANCE.DEBUG)
      formattedLog(message, tag, COLOR_KEYS.CYAN)

  },
  error: (message: unknown, tag = '') => {
    if (LOG_LEVEL <= LOG_IMPORTANCE.ERROR)
      formattedLog(message, tag, COLOR_KEYS.RED)

  },
  info: (message: unknown, tag = '') => {
    if (LOG_LEVEL <= LOG_IMPORTANCE.INFO)
      formattedLog(message, tag, COLOR_KEYS.BLUE)

  },
  verbose: (message: unknown, tag = '') => {
    if (LOG_LEVEL <= LOG_IMPORTANCE.VERBOSE)
      formattedLog(message, tag, COLOR_KEYS.WHITE)

  },
  warn: (message: unknown, tag = '') => {
    if (LOG_LEVEL <= LOG_IMPORTANCE.WARN)
      formattedLog(message, tag, COLOR_KEYS.YELLOW)

  },
}

function formattedLog(
  message: unknown,
  tag: string,
  colorKey: ValueOf<typeof COLOR_KEYS>
) {
  const error = new Error('placeholder')
  const caller = error.stack?.split('\n')[3].replace(/\s+at\s+/, '') ?? ''
  tag = tag ? tag + ': at ' + caller : caller
  if (
    typeof message === 'string' ||
    typeof message === 'number' ||
    typeof message === 'boolean'
  )
    console.log(colorKey + `${tag} ${message}`)
  else {
    console.log(colorKey + tag)
    console.log(message)
  }
}
export default LogUtil
