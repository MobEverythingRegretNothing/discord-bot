import { DiscordEventStore } from "../discord-event-store";
import { EventBridgeEvent } from "aws-lambda";
import { AwsDiscordEventStore } from "../packages/aws/dynamo/aws-discord-event-store";
import { DiscordEvent } from "src/packages/discord/discord-event";

/**
 * This lambda streams the events from eventbridge into the Event Store (DynamoDB)
 * 
 * Elements:
 *      | AWS SecretsManager: All secrets should be pulled from here
 *      | AWS EventBridge: Pub/Sub Notifications should be received from the bot EventBridge
 *      | AWS DynamoDB: Event Storage Database
 **/
export async function handler(_event: EventBridgeEvent<string, DiscordEvent>, _context: any): Promise<void> {
    console.log(`Event: ${JSON.stringify(_event)}`);
    console.log(`Context: ${JSON.stringify(_context)}`);
    
    await configure()
        .then((eventStore) => {
            console.log("Received event for storage");
            console.log(eventStore)
        })
        .catch(error => {
            console.error("Failed to store event to database", error);
        })

}


async function configure(): Promise<DiscordEventStore> {
    console.log(`Configuring Discord Event Store for an AWS Environment...`);

    const region: string = process.env['awsRegion'] ?? 'us-west-2';
    const storeName: string = process.env['eventStoreName'] ?? 'None';

    return new AwsDiscordEventStore(region, storeName);
}