'use strict';

module.exports = Context;

function Context(app, msg) {
  this.message = msg;
  this.app = app;
  this.data = JSON.parse(msg.body.toString());
}

Context.prototype = {
  get basicData() {
    return this.data.basicData;
  },

  get items() {
    return this.data.items;
  },

  finish: function () {
    this.emit('finish');
  }
};
