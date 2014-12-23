'use strict';

module.exports = function () {
  return function *createInvoice(next) {
    yield this.create();
    yield* next;
  };
};
