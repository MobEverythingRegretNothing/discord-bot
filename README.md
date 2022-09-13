# discord-bot

A discord bot for the boneyard (Flamed Retardant)


## TODO

* Local Testing w/Docker
  * Spin up bot in local image
    * Spin up local database (LocalStack or MongoDB)
      * Docker Image
    * Spin up local pub/sub framework (LocalStack or mock)
* AWS
  * Write DynamoDB client for storing event
  * Store Bot Secrets in AWS
  * Can Alex access my AWS through roles?
  * Write CDK code to spin up infrastructure (For the Spandex App)
* Application
  * Write Docker files for application
  * Write other event handlers
* CICD
    * Write Github action for deploying to AWS 
      * Can we choose AWS Account

* AWS X-Ray?


## Resources

(Eris Docs)[https://abal.moe/Eris/docs/0.16.1]