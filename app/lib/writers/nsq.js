'use strict';

var util = require('util');
var nsq = require('nsq.js');
var Emitter = require('events').EventEmitter;

module.exports = NSQWriter;

util.inherits(NSQWriter, Emitter)

var proto = NSQWriter.prototype;

function NSQWriter(config) {
  Emitter.call(this);

  config = config.writer || {};

  this._ready = false;
  this.topic = config.topic;

  var writer = this.writer = nsq.writer(config);
  writer.once('ready', this._onReady.bind(this));
  writer.on('error', this.emit.bind(this, 'error'));
}

proto._onReady = function () {
  this._ready = true;
  this.emit('ready');
};

proto.ready = function () {
  return (function (cb) {
    if (this._ready) {
      return cb();
    }
    this.once('ready', cb);
  }).bind(this);
};

proto.publish = function (res) {
  this.writer.publish();
  return this;
};
