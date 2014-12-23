'use strict';

var debug = require('debug')('ymis:create-invoice');

module.exports = function () {
  return function *createInvoice(next) {
    debug('create invoice');
    this.number = yield this.create();
    debug('invoice number', this.number);
    yield* next;
  };
};
