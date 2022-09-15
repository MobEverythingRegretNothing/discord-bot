import { App, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { EventBus } from 'aws-cdk-lib/aws-events';
 
/**
 * Infrastructure for EventStore goes in this siloed stack
 */
export class EventStoreStack extends Stack {

    readonly eventStore: Table;

    readonly targetBus: EventBus;

    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);

        // Create DynamoDB database
        this.eventStore = new Table(this, 'SpandexEventStore', { partitionKey: { name: 'id', type: AttributeType.STRING }} )

        // Create Target Event Bus to receive Discord Events
        this.targetBus = new EventBus(this, 'EventStoreTargetBus', {
            eventBusName: 'EventStoreTargetBus'
        });
    }

}