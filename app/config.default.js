'use strict';

var config = module.exports;
var nsqlookupd = process.env.NSQLOOKUPD;
var nsqd = process.env.NSQD || '';

// middlewares
config.init = function (app) {
  app.use(app.logger());
  app.use(app.cetustekValidate());
  app.use(app.createInvoice());
};

config.logdir = './log';

// 如何取得資料
// 可以是一個 function，function 回傳一個 reader
config.reader = 'nsq';

// 如何回傳結果
// 一樣也可以是一個 function，同 reader
config.writer = 'nsq';

// nsq reader/writer 設定
// 這兩個設定會直接傳入 nsq.js 的 reader/writer method 去建立 reader/writer
// 唯一一個差異是 writer 我們需要給定一個 topic 用來塞回傳訊息
config.nsq = {
  reader: {
    nsqd: [ nsqd + ':4150' ],
    client_id: 'consumer',
    topic: 'invoice',
    channel: 'create',
    maxInFlight: 10,
    maxAttempts: 5
  },
  writer: {
    port: '4150',
    host: nsqd,
    topic: 'invoice-create-response',
    nsqlookupd: nsqlookupd
  }
};

// 電子發票服務
config.service = 'cetustek';

config.cetustek = {
  endpoint: '', // 可不填
  user: '123123',
  password: '123123'
};
