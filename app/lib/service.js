'use strict';

var co = require('co');
var util = require('util');
var domain = require('domain');
var compose = require('koa-compose');
var assign = require('object-assign');
var Emitter = require('events').EventEmitter;
var noop = require('./noop');
var config = require('./config');
var Context = require('./context');
var middlewares = require('./middlewares');
var UNKNOWN_ERROR = require('./error-types').UNKNOWN_ERROR;

module.exports = App;

function App() {
  if (!(this instanceof App)) {
    return new App();
  }

  this.middlewares = [];
  this.reader = createReader();
  this.writer = createWriter();
  this.service = createService();

  var d = this.domain = domain.create();
  d.add(this.reader);
  d.add(this.writer);
  d.add(this.service);
}

var proto = {
  use: function (fn) {
    this.middlewares.push(fn);
    return this;
  },

  start: function (cb) {
    this.reader.on('message', this.callback());
    this.reader.resume();
    this.writer.ready(cb || noop);
    return this;
  },

  stop: function () {
    this.reader.pause();
    this.reader.removeAllListeners('data');
    return this;
  },

  callback: function () {
    var mw = [respond].concat(this.middleware);
    var gen = compose(mw);
    var fn = co.wrap(gen);

    return (function (data) {
      var ctx = new Context(this, data);
      fn.call(ctx)
        .catch(this.emit.bind(this, 'error'));
    }).bind(this);
  }
};

assign(App, middlewares);
assign(App.prototype, Emitter.prototype, proto, middlewares);

function createReader() {
  var Reader = require('./readers/' + config.reader);
  return new Reader(config[config.reader]);
};

function createWriter() {
  var Writer = require('./writers/' + config.writer);
  return new Writer(config[config.writer]);
};

function createService() {
  var Service = require('./services/' + config.service);
  return new Service(config[config.service]);
};

function *respond(next) {
  try {
    yield* next;
  } catch (err) {
    // 未知錯誤
    if (err.type === undefined) {
      err = new Error(err.message);
      err.type = UNKNOWN_TYPE;
    }

    this.app.emit('error', err);
    this.failed(err);
    return;
  }

  this.success();
}
