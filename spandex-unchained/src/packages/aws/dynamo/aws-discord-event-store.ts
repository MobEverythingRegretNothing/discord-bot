import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DiscordEventStore } from "../../../discord-event-store";
import { DiscordEvent } from "../../discord/discord-event";

export class AwsDiscordEventStore implements DiscordEventStore {

    readonly client: DynamoDBClient;

    readonly storeName: string;

    constructor(region: string, storeName: string) {
        this.client = new DynamoDBClient({region});
        this.storeName = storeName;
    }

    store(event: DiscordEvent): Promise<void> {
        throw new Error("Method not implemented.");
    }

}