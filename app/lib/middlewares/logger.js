'use strict';

var logger = require('../logger');

module.exports = function () {
  return function *loggerMiddleware(next) {
    var start = process.hrtime();

    yield* next;

    var duration = process.hrtime(start);

    logger.log('info', 'receive data %j', this.data, {
      duration: duration
    });
  };
};
