import { EventBridgeClient, PutEventsCommandInput, PutEventsCommand, PutEventsCommandOutput } from '@aws-sdk/client-eventbridge';
import { MessageEventNotificationError } from "../../config/error/message-event-notification-error";
import { DiscordEventNotifier } from '../../../discord-event-notifier';
import { DiscordEvent } from '../../discord/discord-event';

export class AwsDiscordEventNotifier implements DiscordEventNotifier {

    readonly client: EventBridgeClient;

    readonly eventBusName: string;

    constructor(region: string, eventBusName: string) {
        this.client = new EventBridgeClient({region});
        this.eventBusName = eventBusName;
    }

    async notify(event: DiscordEvent): Promise<void> {
        console.log(`Sending Discord Event to AwsEventBridge for Pub/Sub`);

        // Create Message Event
        const input: PutEventsCommandInput = {
            Entries: [
                {
                    EventBusName: this.eventBusName,
                    DetailType: 'Message Created',
                    Detail: JSON.stringify(event),
                    Source: 'Spandex Unchained'
                }
            ]
        };

        // Send to Subscribers via AWS EventBridge
        return this.client.send(new PutEventsCommand(input))
            .then((output: PutEventsCommandOutput) => {
                console.log(`Successfully sent ${output.Entries?.length ?? 'Unknown' } Message Event`);
            })
            .catch(error => {
                throw new MessageEventNotificationError('Failed to send message notification event', event.type, event.id).withCause(error);
            });
    }


}