const {transports, createLogger, format} = require('winston');
const {env} = require('../../config');

  const logger = createLogger({
    transports: [
      new transports.File({
        format: format.combine(
          format.timestamp(),
          format.json()
        ),
        filename: 'error.log',
        level: 'error'
      }),
      new transports.File({
        format: format.combine(
          format.timestamp(),
          format.json()
        ),
        filename: 'info.log',
        level: 'info'
      })
    ]
  });

  if (env !== 'production') {
    logger.add(new transports.Console({
      format: format.simple(),
      level: 'info'
    }))
  }

module.exports = logger;