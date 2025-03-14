import { LoggerOptions, transports, format, createLogger, addColors, level } from 'winston';
const { combine, timestamp, printf, prettyPrint, colorize, json, label, cli } = format;
import axios from 'axios';
import { envConfig } from '~/constants/env';

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

export const alertToTelegram = async (level: string, message: string) => {
    try {
        await axios.post(`https://api.telegram.org/bot${envConfig.BOT_FATHER_TOKEN}/sendMessage`, {
            chat_id: envConfig.GROUP_CHAT_ID,
            text: `#### MESSAGE FROM THE SERVER: \t${message}`,
            parse_mode: 'Markdown',
        });
    } catch (error) {
        logger.error('Can not send to Telegram!', error);
    }
};

export const logger_config: LoggerOptions = {
    level: 'fatal',
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
