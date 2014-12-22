'use strict';

var nsq = require('nsq.js');
var util = require('util');
var Emitter = require('../emitter');

module.exports = NSQReader;

util.inherits(NSQReader, Emitter)

var proto = NSQReader.prototype;

function NSQReader(config) {
  Emitter.call(this);
  var reader = this.reader = nsq.reader(config.reader || {});
  reader.on('message', this.emit.bind(this, 'data'));
}
