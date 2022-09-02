# jema-web-api

JEM-A(JEM1427) API

## RESTful APIドキュメント

https://nana4rider.github.io/jema-web-api/

## MQTT

### Topic/Message

```
SUBSCRIBE {baseTopic}/{deviceId}/get
```
message
```
ACTIVE or INACTIVE
```

```
PUBLISH {baseTopic}/{deviceId}/set
```
message
```
ACTIVE or INACTIVE
```

### Home Assistant
```yaml
mqtt:
  lock:
    - name: Door
      state_topic: "jema-web-api/door/get"
      command_topic: "jema-web-api/door/set"
      payload_lock: "ACTIVE"
      payload_unlock: "INACTIVE"
      state_locked: "ACTIVE"
      state_unlocked: "INACTIVE"
      optimistic: false
      qos: 1
```
