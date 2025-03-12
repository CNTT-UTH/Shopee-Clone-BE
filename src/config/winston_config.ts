import { LoggerOptions, transports, format, createLogger, addColors } from 'winston';
const { combine, timestamp, printf, prettyPrint, colorize, json, label, cli } = format;

export const myCustomLevels = {
    colors: {
        trace: 'magenta',
        input: 'grey',
        verbose: 'cyan',
        prompt: 'grey',
        debug: 'blue',
        info: 'green',
        data: 'grey',
        help: 'cyan',
        warn: 'yellow',
        error: 'red',
    },
};

export const logger_config: LoggerOptions = {
    level: 'info',
    format: combine(
        colorize({
            all: true,
        }),
        label({ label: 'Linhhuynhcoding: ' }),
        timestamp({
            format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        // cli(),
        // prettyPrint(),
        // json(),
        printf(({ level, message, timestamp }) => `[ ${timestamp} ] ${level}: \t${message}`),
    ),
    transports: [new transports.Console()],
};

addColors(myCustomLevels.colors);

export const logger = createLogger(logger_config);
