/*
 *  Logger initialization.
 *  { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
 *  example:
 *  logger.info('Hello');
 *
 *  Link: https://github.com/winstonjs/winston#instantiating-your-own-logger
 *
 */
module.exports = function (app, mongoose) {

    var winston = require('winston');

    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: '/tmp/resbuilder.log' })
        ]
    });
    
    
    return logger;

};