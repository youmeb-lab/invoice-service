終於不用在徒手摳那個噁噁的 API 了！！！！！

## 回傳格式

### 成功

```javascript
{
    "OrderId": ...,
    "InvoiceNumber": ...
}
```

### 失敗

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
