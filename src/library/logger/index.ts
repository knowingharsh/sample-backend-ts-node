import { Config } from '../../configuration';
import Logger from './logger';
import util from 'util';

const dumpLog = Logger({
  loggerLocation: Config.EnvConfig.LOGGER_LOCATION,
  loggerFile: Config.EnvConfig.LOGGER_FILE,
  loggerLevel: Config.EnvConfig.LOGGER_LEVEL,
});

// we can create different log files for different purposes
// const requestLogs = Logger({
//   loggerLocation: Config.EnvConfig.LOGGER_LOCATION || './dumps/',
//   loggerFile: Config.EnvConfig.LOGGER_FILE || 'dumps.log',
//   loggerLevel: Config.EnvConfig.LOGGER_LEVEL || 'debug',
// });

export const Logs = {
  dump: dumpLog,
  console: (any: any) => console.log(util.inspect(any, false, null, true /* enable colors */))
};


