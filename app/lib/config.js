'use strict';

var path = require('path');
var assign = require('object-assign');
var flags = require('./flags');
var config = require('../config.default');
var cwd = process.cwd();

// 如果使用者有指定 config 檔案，那需要把他跟預設設定合併
if (flags.config) {
  let tmp = require(flags.config);
  assign(config, tmp);
}

// 路徑
config.logdir = path.resolve(config.logdir);

module.exports = config;
