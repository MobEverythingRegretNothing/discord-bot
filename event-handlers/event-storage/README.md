# Handler | Event Storage

    This event handler routes incoming events to a DynamoDB table for storage. 

## Example Event

```js
[
  {
    "Time": "2022-01-14T01:02:03Z",
    "Source": "Spandex Unchained",
    "Resources": [
      "resource1",
      "resource2"
    ],
    "DetailType": "myDetailType",
    "Detail": "{ \"key1\": \"value1\", \"key2\": \"value2\" }"
  }
]
```