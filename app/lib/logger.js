'use strict';

var path = require('path');
var winston = require('winston');
var flags = require('./flags');
var config = require('./config');

// 使用檔案儲存 log
winston.add(winston.transports.DailyRotateFile, {
  filename: path.join(config.logdir, 'ymis.log')
});

// 如果使用者有用 `--verbose` 那就讓 stdout 也輸出 log 資料
if (!flags.verbose) {
  winston.remove(winston.transports.Console);
}

module.exports = winston;
