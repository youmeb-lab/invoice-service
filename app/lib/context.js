'use strict';

module.exports = Context;

function Context(app, data) {
  this.app = app;
  this.data = data;
}

Context.prototype = {
  get basicData() {
    return this.data.basicData;
  },

  get items() {
    return this.data.items;
  }
};
