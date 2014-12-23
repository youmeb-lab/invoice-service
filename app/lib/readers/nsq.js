'use strict';

var util = require('util');
var nsq = require('nsq.js');
var Emitter = require('events').EventEmitter;
var Message = require('../message');

module.exports = NSQReader;

util.inherits(NSQReader, Emitter)

var proto = NSQReader.prototype;

function NSQReader(config) {
  Emitter.call(this);
  var reader = this.reader = nsq.reader(config.reader || {});
  reader.on('message', this._onMessage.bind(this));
  reader.on('discard', this._onDiscard.bind(this));
  reader.on('error', this.emit.bind(this, 'error'));
}

proto.resume = function () {
  this.reader.resume();
  return this;
};

proto.pause = function () {
  this.reader.pause();
  return this;
};

proto._onMessage = function (nsqmsg) {
  var msg = nsqmsg2msg(nsqmsg);
  msg.once('finish', nsqmsg.finish.bind(nsqmsg));
  this.emit('data', msg);
};

proto._onDiscard = function (nsqmsg) {
  var msg = nsqmsg2msg(nsqmsg);
  nsqmsg.finish();
  this.emit('giveup', msg);
};

function nsqmsg2msg(nsqmsg) {
  var data = nsqmsg.body.toString();

  try {
    data = JSON.parse(data);
  } catch (e) {
    data = {};
  }

  return new Message(data.basicData, data.items);
}
