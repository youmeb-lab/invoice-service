'use strict';

var config = module.exports;

var nsqlookupd = process.env
  .NSQLOOKUPD_PORT_4160_TCP
  .replace(/^tcp:\/\//, '');

var nsqdHost = process.env
  .NSQLOOKUPD_PORT_4160_TCP_ADDR;

config.logdir = './log';

// 如何取得資料
config.reader = 'nsq';

// 如何回傳結果
config.writer = 'nsq';

// nsq reader/writer 設定
// 這兩個設定會直接傳入 nsq.js 的 reader/writer method 去建立 reader/writer
// 唯一一個差異是 writer 我們需要給定一個 topic 用來塞回傳訊息
config.nsq = {
  reader: {
    nsqlookupd: [ nsqlookupd ],
    client_id: 'consumer',
    topic: 'invoice',
    channel: 'create',
    maxInFlight: 10,
    maxAttempts: 5
  },
  writer: {
    port: '4150',
    host: nsqdHost,
    topic: 'invoice-create-response',
    nsqlookupd: [ nsqlookupd ]
  }
};

// 電子發票服務
config.invoice = 'cetustek';

config.cetustek = {
  user: '',
  password: ''
};
