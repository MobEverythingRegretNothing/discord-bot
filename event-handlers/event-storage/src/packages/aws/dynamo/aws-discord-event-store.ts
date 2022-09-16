import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DiscordEventStore } from "../../../discord-event-store";
import { DiscordEvent } from "../../discord/discord-event";

export class AwsDiscordEventStore implements DiscordEventStore {

    private readonly client: DynamoDBClient;

    private readonly storeName: string;

    constructor(region: string, storeName: string) {
        this.client = new DynamoDBClient({region});
        this.storeName = storeName;
    }

    public store(event: DiscordEvent): Promise<void> {
        
    }

}