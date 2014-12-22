'use strict';

var Invoice = require('cetustek-invoice');

module.exports = CetustekService;

var proto = CetustekService.prototype;

function CetustekService(config) {
  this.client = new Invoice({
    user: config.user,
    password: config.password
  });
}

proto.create = function (basicData, items) {
  return this.client.create(basicData, items);
};
