'use strict';

var config = module.exports;

var nsqlookupd = process.env
  .NSQLOOKUPD_PORT_4160_TCP
  .replace(/^tcp:\/\//, '');

var nsqdHost = process.env
  .NSQLOOKUPD_PORT_4160_TCP_ADDR;

// 如何取得資料
config.in = 'nsq';

// 如何回傳結果
config.out = 'nsq';

// nsq adapter
config.nsq = {
  reader: {
    nsqlookupd: [ nsqlookupd ],
    client_id: 'consumer',
    topic: 'create',
    channel: 'invoice',
    maxInFlight: 10,
    maxAttempts: 5
  },
  writer: {
    port: '4150',
    host: nsqdHost,
    nsqlookupd: [ nsqlookupd ]
  }
};
