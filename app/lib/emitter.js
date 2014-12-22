'use strict';

var utils = require('utils');
var thunkify = require('thunkify');
var EventEmitter = require('events').EventEmitter;

module.exports = Emitter;

util.inherits(Emitter, EventEmitter);

var proto = Emitter.prototype;

function Emitter() {
  EventEmitter.call(this);
}

proto.on = thunkify(EventEmitter.prototype.on);
proto.once = thunkify(EventEmitter.prototype.once);
