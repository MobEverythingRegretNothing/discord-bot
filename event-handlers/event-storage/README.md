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

## Local Testing

  Using Docker you can spin up a local DynamoDB. See the package.json for scripts related to Docker. See the /build folder for the Docker Compose files.

* [https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html](DynamoDB CLI Reference)
  
  
## Todo

* Learn how to configure docker DynamoDB locally to match schema in AWS
* Determine best structure/indices for searching