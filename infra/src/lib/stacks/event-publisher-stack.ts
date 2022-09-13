import { App, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus } from 'aws-cdk-lib/aws-events';
 
/**
 * Infrastructure for EventPublisher goes in this siloed stack
 */
export class EventPublisherStack extends Stack {

    readonly eventBridge: EventBus;

    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);

        // Create DynamoDB database
        this.eventBridge = new EventBus(this, 'SpandexEventBus', {
            eventBusName: 'SpandexUnchainedEventBus'
        });
    }

}