'use strict';

var Invoice = require('cetustek-invoice');
var type = require('./type');

module.exports = CetustekService;

var proto = CetustekService.prototype;

function CetustekService(config) {
  this.client = new Invoice({
    user: config.user,
    password: config.password
  });
}

proto.create = function (basicData, items) {
  return this.client.create(basicData, items)
    .catch(function (err) {
      err.type = type(err.code);
    });
};
