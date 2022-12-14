import { DiscordEventNotifier } from "../discord-event-notifier";
import { AwsDiscordEventNotifier } from "../packages/aws/eventbridge/aws-discord-event-notifier";
import { SpandexUnchained } from "../spandex-unchained";

/**
 * This is the entry point for the AWS EC2 Application. All configuration and implementations should be constructed as if deployed 
 * in AWS.
 * 
 * Elements:
 *      | AWS SecretsManager: All secrets should be pulled from here
 *      | AWS EventBridge: Pub/Sub Notifications should be sent out through EventBridge
 **/
configure()
    .then(spandex => {
        spandex.run()
    });

async function configure(): Promise<SpandexUnchained> {
    console.log(`Configuring Spandex Unchained for an AWS Environment...`);

    const region: string = process.env['awsRegion'] ?? 'us-west-2';
    const eventBusName: string = process.env['eventBusName'] ?? 'None';

    const token: string = process.env['botToken']!;

    const notifier: DiscordEventNotifier = new AwsDiscordEventNotifier(region, eventBusName);

    return new SpandexUnchained(notifier, token);

}