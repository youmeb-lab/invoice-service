'use strict';

var path = require('path');
var argv = require('optimist')
  .boolean('verbose')
  .string('config')
  .default('concurrent', 10)
  .argv;

var cwd = process.cwd();

if (!argv.config && process.env.CONFIG) {
  argv.config = process.env.CONFIG;
}

argv.config && (argv.config = path.resolve(cwd, argv.config));

module.exports = argv;
