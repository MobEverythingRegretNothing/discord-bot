## Infrastructure

The infrastructure for this project will be created using AWS CDK. All relevant resources can be found in the `infra` folder. See [The README](./infra/docs/Infrastructure.md) for more info.

## Application

The primary application in this repo is **`Spandex Unchained`**, a discord bot that monitors the discord WebSocket API for the Boneyard.


## Work To-do

* Local Testing w/Docker
  * Spin up bot in local image
    * Spin up local database (LocalStack or MongoDB)
      * Docker Image
    * Spin up local pub/sub framework (LocalStack or mock)
* AWS
  * Write CDK code to spin up infrastructure (For the Spandex App)
* Application
  * Write Docker files for application
  * Write other event handlers
  * Error Handling/Logging

* AWS X-Ray?


## Resources

* [Eris (Discord Library) Docs](https://abal.moe/Eris/docs/0.16.1)