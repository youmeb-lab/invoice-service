'use strict';

var types = require('../../error-types');

module.exports = function (code) {
  return code && (code === 'UNKNOWN'
    ? types.UNKNOWN_ERROR
    : types.SERVICE_ERROR);
};
