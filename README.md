# jema-web-api

JEM-A(JEM1427) API

## RESTful APIドキュメント

https://nana4rider.github.io/jema-web-api/

## MQTT

```
SUBSCRIBE {baseTopic}/{deviceId}/get
```
message
```
ACTIVE or INACTIVE
```

### 電子鍵の状態を設定します
```
PUBLISH {baseTopic}/{deviceId}/set
```
message
```
ACTIVE or INACTIVE
```
