import { EventBridgeClient, PutEventsCommandInput, PutEventsCommand, PutEventsCommandOutput } from '@aws-sdk/client-eventbridge';
import { MessageEventNotificationError } from "../../config/error/message-event-notification-error";
import { DiscordEventNotifier } from '../../../discord-event-notifier';
import { DiscordEvent } from '../../discord/discord-event';

export class AwsDiscordEventNotifier implements DiscordEventNotifier {

    private readonly client: EventBridgeClient;

    private readonly eventBusName: string;

    constructor(region: string, eventBusName: string) {
        this.client = new EventBridgeClient({region});
        this.eventBusName = eventBusName;
    }

    public async notify(event: DiscordEvent): Promise<void> {
        console.log(`Sending Discord Event to AwsEventBridge for Pub/Sub`);

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

        return this.client.send(new PutEventsCommand(input))
            .then((output: PutEventsCommandOutput) => {
                console.log(`Successfully sent Message Event to Event Bus ${this.eventBusName}`);
                console.log(`Event ID: ${output?.Entries?.at(0)?.EventId ?? 'None'}`)
            })
            .catch(error => {
                throw new MessageEventNotificationError('Failed to send message notification event', event.type, event.id).withCause(error);
            });
    }


}