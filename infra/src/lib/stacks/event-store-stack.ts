import { App, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table, ProjectionType } from 'aws-cdk-lib/aws-dynamodb';
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
        this.eventStore = new Table(this, 'SpandexEventStore', {
            tableName: 'SpandexEventStore', 
            partitionKey: { name: 'id', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
            sortKey: {name: 'timestamp', type: AttributeType.NUMBER }
        });

        this.eventStore.addGlobalSecondaryIndex({
            indexName: 'contentIndex',
            sortKey: {name: 'timestamp', type: AttributeType.STRING},
            projectionType: ProjectionType.ALL,
            partitionKey: { name: 'sourceUser', type: AttributeType.STRING }
          });

        // Create Target Event Bus to receive Discord Events
        this.targetBus = new EventBus(this, 'EventStoreTargetBus', {
            eventBusName: 'EventStoreTargetBus'
        });
    }

}