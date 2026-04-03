const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console({ format: format.simple() }),
    new transports.File({ filename: process.env.LOG_FILE || 'logs/bridge.log', maxsize: 5242880, maxFiles: 5 })
  ]
});

module.exports = { logger };
