## 基本想法

1. 網站將發票資訊 `publish` 到 queue 裡（預設使用 NSQ）
2. `InvoiceService` 透過 `Reader` 從 queue 取得發票資訊進行
5. 從 queue 中移除
3. 發票開完後將他X的 Error Code 轉成人能懂得錯誤訊息
4. 寫 log
5. 透過 `Writer` 把發票號碼、錯誤碼、錯誤訊息丟給 queue 或 db（預設 NSQ）

## Reader

繼承 `EventEmitter`，emit `message` 事件跟 `giveup` 事件

[./app/lib/readers/nsq.js](./app/lib/readers/nsq.js#L35)

* #resume()
* #pause()

## Writer

繼承 `EventEmitter`，emit `ready` 事件

* #publish()
* #ready() - 回傳 yieldable object

## 開發

開發時候使用 NSQ，NSQ 有一個 `nsqadmin` 可以方便我們觀察 queue 的狀況

```
http://localhost:4171
```

### 指令

* __啟動 server__: `make`
* __停止 server__: `make stop`
* __列出 container__: `make ps`
