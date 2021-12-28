export const EnvConfig = {
  SERVER_PORT: process.env.SERVER_PORT || '4000',

  LOGGER_LOCATION: process.env.LOGGER_LOCATION || './logs/',
  LOGGER_FILE: process.env.LOGGER_FILE || 'myDump.log',
  LOGGER_LEVEL: process.env.LOGGER_LEVEL || 'debug',
}