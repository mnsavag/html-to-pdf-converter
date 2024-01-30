import { transports, format, createLogger } from 'winston'


const logFormat = format.printf(({message, timestamp}) => {
    return `${timestamp} ${message}`
})

export const logger = createLogger({
    transports: [
        new transports.File({
            level: 'info',
            filename: 'logs.log'
        })
    ],
    format: format.combine(
        format.json(),
        format.timestamp(),
        logFormat
    )
})