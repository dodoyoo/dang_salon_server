import winston, { createLogger, transports, format, config } from 'winston';
import path from 'path';

const customLevels: config.AbstractConfigSetLevels = {
    customedError: 0,
    customedWarn: 1,
    customedInfo: 2,
    customedDebug: 3,
    customedSilly: 4,
};

const customColors: config.AbstractConfigSetColors = {
    customedError: 'red',
    customedWarn: 'yellow',
    customedInfo: 'cyan',
    customedDebug: 'magenta',
    customedSilly: 'gray',
};

winston.addColors(customColors);

interface CustomLevels extends winston.Logger {
    customedError: (message: string, ...meta: any[]) => void;
    customedWarn: (message: string, ...meta: any[]) => void;
    customedInfo: (message: string, ...meta: any[]) => void;
    customedDebug: (message: string, ...meta: any[]) => void;
    customedSilly: (message: string, ...meta: any[]) => void;
}

interface TransformableInfo {
    level: string;
    message: string;
    [key: string]: any;
}

const customLogger: CustomLevels = <CustomLevels>createLogger({
    levels: customLevels,
    format: format.combine(
        format.label({ label: '[customed-server]' }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.colorize(),
        format.printf((info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.label} ${info.message}`),
    ),
    transports: [
        new transports.Console({ level: 'customedSilly' }),
        new transports.File({
            filename: path.join(__dirname, 'logs', 'error.log'),
            level: 'customedError',
        }),
        new transports.File({
            filename: path.join(__dirname, 'logs', 'combined.log'),
        }),
    ],
});

customLogger.customedError = (message: string, ...meta: any[]) => customLogger.log('customedError', message, ...meta);
customLogger.customedWarn = (message: string, ...meta: any[]) => customLogger.log('customedWarn', message, ...meta);
customLogger.customedInfo = (message: string, ...meta: any[]) => customLogger.log('customedInfo', message, ...meta);
customLogger.customedDebug = (message: string, ...meta: any[]) => customLogger.log('customedDebug', message, ...meta);
customLogger.customedSilly = (message: string, ...meta: any[]) => customLogger.log('customedSilly', message, ...meta);

export { customLogger };
