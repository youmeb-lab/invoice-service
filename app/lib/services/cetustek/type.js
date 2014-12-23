'use strict';

var types = require('../../error-types');

module.exports = function (code) {
  if (code === 'UNKNOWN') {
    return types.UNKNOWN_ERROR;
  }
  
  return code ? types.SERVICE_ERROR : types.VALIDATE_ERROR;
};
