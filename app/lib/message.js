'use strict';

var util = require('util');
var Emitter = require('events').EventEmitter;

module.exports = Message;

util.inherits(Message, Emitter);

function Message(basicData, items) {
  this.basicData = basicData || {};
  this.items = items || [];
}
