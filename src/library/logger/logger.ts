
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment';

interface ILogger {
  loggerLocation: string,
  loggerFile: string,
  loggerLevel: string,
}

export default function log({ loggerLocation, loggerFile, loggerLevel }:ILogger) {
  return winston.createLogger({
    level: loggerLevel,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format((info, options) => {
        info.unixTime = moment().unix();
        return info
      })(),
      winston.format.printf((info) => {
        return `${JSON.stringify(info)}`
      })
    ),
    transports: [
      new DailyRotateFile({
        filename: loggerLocation + loggerFile,
        maxSize: '50m',
        maxFiles: '6d'
      }),
    ],
  });
}
