終於不用在徒手摳那個噁噁的 API 了！！！！！

* 回傳人看得懂的錯誤訊息
* 不用去接腦腦的 SOAP
* 批次處理不用等待

## 如何使用？

### 安裝/執行

#### Docker

```bash
$ docker pull youmeb/invoice-service
```

預設使用 NSQ 所以在不自訂 reader/writer 的情況下我們也必須啟動 `nsqd`：

```bash
$ docker pull nsqio/nsqd
$ docker run --name nsqd -p 4150:4150 -p 4151:4151 -d nsqio/nsqd
```

接著要把 `nsqd` 的 address 跟 port 寫到 config 裡面，ymis 的 config 檔可以是 js 或 json，建議建立一個 config 目錄把主要設定寫到 config/index.js，當我們需要自訂 reader/writer 的時候這樣作會比較方便：

```bash
$ docker run --link nsqd:nsqd -v $(pwd):/config --rm -it ymis --config /config
```

#### 其他方式

下載 Source code

```bash
$ git clone git@github.com:youmeb-lab/invoice-service.git
```

直接執行 `ymis`

```bash
$ ./invoice-service/app/bin/ymis --config /config
```

### 接收格式

```bash
{
  "data": {
    "OrderId": "A44556632",
    "OrderDate": "2011/09/13",
    "BuyerIdentifier": "53118823",
    "BuyerName": "測試",
    "BuyerAddress": "OOXX 的地址",
    "BuyerPersonInCharge": "死肥X",
    "BuyerTelephoneNumber": "0800797899",
    "BuyerFacsimileNumber": "02-26511024",
    "BuyerEmailAddress": "test@fakeinbox.com",
    "BuyerCustomerNumber": "VIG01AA39090",
    "DonateMark": 0,
    "InvoiceType": "05",
    "NPOBAN": "",
    "PayWay": 2,
    "TaxType": 1,
    "TaxRate": 0.05,
    "Remark": ""
  },
  "items": [
    {
      "ProductionCode": "AAA123",
      "Description": "OOXX",
      "Quantity": 17,
      "Unit": "月",
      "UnitPrice": 50000
    }
  ]
}
```

### 回傳格式

#### 成功

```javascript
{
    "OrderId": ...,
    "InvoiceNumber": ...
}
```

#### 失敗

```javascript
{
    "OrderId": ...,
    "error": {
        "type": ...,
        "code": ...,
        "reason": ...
    }
}
```

## Reader

繼承 `EventEmitter`，emit `message` 事件跟 `giveup` 事件

[./app/lib/readers/nsq.js](./app/lib/readers/nsq.js#L35)

* #resume()
* #pause()

## Writer

繼承 `EventEmitter`，emit `ready` 事件

* #publish(object)
* #ready(callback)

## 開發

開發時候使用 NSQ，NSQ 有一個 `nsqadmin` 可以方便我們觀察 queue 的狀況

```
http://localhost:4171
```

## Todo

有些介面有點醜，找時間應該要來修一下
