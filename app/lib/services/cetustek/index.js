'use strict';

var Invoice = require('cetustek-invoice');
var type = require('./type');

module.exports = CetustekService;

var proto = CetustekService.prototype;

function CetustekService(config) {
  this.client = new Invoice(config);
}

proto.create = function (data, items) {
  return this.client.create(data, items)
    .catch(function (err) {
      err.type = type(err.code);
      throw err;
    });
};
