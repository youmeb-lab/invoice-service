'use strict';

module.exports = Context;

function Context(app, msg) {
  this.message = msg;
  this.app = app;
}

Context.prototype = {
  get data() {
    return this.message.data;
  },

  get items() {
    return this.message.items;
  },

  create: function *() {
    return yield this.app.service.create(this.data, this.items);
  },

  success: function () {
    this.app.writer.publish({
      OrderId: this.data.OrderId,
      InvoiceNumber: this.number
    });
    this.message.emit('finish');
  },

  failed: function (err) {
    this.app.writer.publish({
      OrderId: this.data.OrderId,
      error: {
        type: err.type,
        code: err.code,
        reason: err.message
      }
    });
    this.message.emit('finish');
  }
};
