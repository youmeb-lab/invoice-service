'use strict';

module.exports = Context;

function Context(app, msg) {
  this.message = msg;
  this.app = app;
  this.data = JSON.parse(msg.body.toString());
}

Context.prototype = {
  get basicData() {
    return this.data.basicData || {};
  },

  get items() {
    return this.data.items || [];
  },

  create: function *() {
    return yield this.writer.create(this.basicData, this.items);
  },

  success: function () {
    this.publish({
      OrderId: this.basicData.OrderId,
      InvoiceNumber: this.number
    });
    this.emit('finish');
  },

  failed: function (err) {
    this.writer.publish({
      OrderId: this.basicData.OrderId,
      error: {
        type: err.type,
        code: err.code,
        reason: err.message
      }
    });
    this.emit('finish');
  }
};
