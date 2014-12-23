'use strict';

var util = require('util');
var Emitter = require('events').EventEmitter;

module.exports = Message;

util.inherits(Message, Emitter);

function Message(data, items) {
  this.data = data || {};
  this.items = items || [];
}
