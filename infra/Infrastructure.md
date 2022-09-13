# AWS CDK Infrastructure

The infrastructure portion of the project is meant to build the CDK *Cloudformation* template which gets uploaded to AWS in order to generate the necessary infrastructure for the bot project

## Project Structure
---

The `/src` folder contains all the necessary typescript files to generate the templates. `/bin` contains the top level file which when run generates the template. The `/lib` folder contains all helper files including [Stacks](https://docs.aws.amazon.com/cdk/v2/guide/stacks.html), which are the primary siloing mechanic of code as well as [Constructs]() which are more abritrary groupings of like infrastructure

    /src
     | - /bin
     | - /lib

## Generated Infrastructure
---

This project consists of a few key parts

**Discord Polling EC2**
    
    This static infrastructure will plug into the Discord server and listen for messages that it knows how to respond to. It will then distribute events based on the form and content of those messages

**Event Bridge**

    This piece of infrastructure will provide a Pub/Sub model for any functions that want to consume the standardized event format and react. This may be functions from this project or it may be functions allowed access in other workload accounts.

**Event Handlers**

    Most likely these will be lambdas which will be triggered by the events shipped through eventbridge.


**Message Database?**

    One concept that may be too expensive (we'll see) but might be cool is to have a dump of all messages that we can then run commands on in the future. Infrastructure is up in the air at this point