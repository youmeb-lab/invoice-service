'use strict';

var co = require('co');
var domain = require('domain');
var Emitter = require('events').EventEmitter;
var compose = require('koa-compose');
var config = require('./config');
var Context = require('./context');

util.inherits(App, Emitter);

module.exports = App;

function App() {
  this.middlewares = [];

  this.reader = createReader();
  this.writer = createWriter();
  this.service = createService();

  var d = this.domain = domain.create();
  d.add(this.reader);
  d.add(this.writer);
  d.add(this.service);
}

App.prototype = {
  use: function (fn) {
    this.middlewares.push(fn);
    return this;
  },

  start: function () {
    this.reader.on('data', this.callback());
    this.reader.resume();
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
    // 未知 Error
    if (!err.code) {
    }
  }
}
