import { createLogger, format, transports } from 'winston';
const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry) => {
    const base = { timestamp: new Date() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
  }

export const logger = createLogger({
    // format: format.combine(format.simple()),
    format: format(jsonFormatter)(),
    transports: [
        new transports.Console(),
        new transports.File({
            filename:`./logs/log-api.log`
        })

    ]
});