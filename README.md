## 基本想法

1. 網站將發票資訊 `publish` 到 queue 裡（預設使用 `nsq`）
2. `InvoiceService` 透過 `Reader` 從 queue 取得發票資訊進行
5. 從 queue 中移除
3. 發票開完後將他X的 Error Code 轉成人能懂得錯誤訊息
4. 寫 log
5. 透過 `Writer` 把發票號碼、錯誤碼、錯誤訊息丟給 queue 或 db（預設 `nsq`）

## Reader

## Writer

## Logging

可以使用任何 `WriteableStream` 來寫入資料
