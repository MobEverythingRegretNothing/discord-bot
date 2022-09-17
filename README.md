## Infrastructure

The infrastructure for this project will be created using AWS CDK. All relevant resources can be found in the `infra` folder. See [The README](./infra/docs/Infrastructure.md) for more info.

## Application

The primary application in this repo is **`Spandex Unchained`**, a discord bot that monitors the discord WebSocket API for the Boneyard.


## Tasks

#### Necessary

- [ ] Event Store Design (DynamoDB)
- [ ] Write Spanex Unchained (EC2/Docker) CDK Code
- [ ] Verify & Test EventBridge
  - [ ] Same Account
  - [ ] Cross Account
- [ ] Finalize event structure
- [ ] Get bot into Boneyard with right permissions
- [ ] Get examples of all the important events

#### Event Handler Ideas

- [ ] Music Streaming Bot
- [ ] Soundboard bot
- [ ] Text Sentiment Analyzer

#### Non-essential

- [ ] Error Handling (What happens if the bot gets an error)
- [ ] Logging (Make sure CloudWatch picks up EC2 logging)
- [ ] Make way to build a new Event Handler easily (Template + Script?) 
  - [ ] Typescript
  - [ ] Python?
  - [ ] RUST?!?
- [ ] Streamline local testing of event handlers
- [ ] Figure out if AWS X-Ray is worth it
- [ ] Does the slash commands Discord interface make sense for any bot commands?
- [ ] Documentation

## Resources

* [Eris (Discord Library) Docs](https://abal.moe/Eris/docs/0.16.1)
* [Discord API Docs](https://github.com/discord/discord-api-docs)