import { DiscordEventNotifier } from "src/discord-event-notifier";
import { AwsDiscordEventNotifier } from "src/packages/aws/eventbridge/aws-discord-event-notifier";
import { SpandexUnchained } from "src/spandex-unchained";

/**
 * This is the entry point for the AWS EC2 Application. All configuration and implementations should be constructed as if deployed 
 * in AWS.
 * 
 * Elements:
 *      | AWS SecretsManager: All secrets should be pulled from here
 *      | AWS EventBridge: Pub/Sub Notifications should be sent out through EventBridge
 *      | AWS DynamoDB: Data Storage should be sent to a DynamoDB table
 **/

configure()
    .then(spandex => {
        spandex.run()
    });

async function configure(): Promise<SpandexUnchained> {
    console.log(`Configuring Spandex Unchained for an AWS Environment...`);

    const notifier: DiscordEventNotifier = new AwsDiscordEventNotifier

    return new SpandexUnchained()

}