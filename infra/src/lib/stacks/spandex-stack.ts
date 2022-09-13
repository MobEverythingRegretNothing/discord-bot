import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import { EventBus } from 'aws-cdk-lib/aws-events';

export interface SpandexProps extends StackProps {
    eventStore: Table;
    eventBridge: EventBus;
} 
 
export class SpandexStack extends Stack {

    constructor(scope: App, id: string, props: SpandexProps) {
        super(scope, id, props);

        // Create EC2 Instance w/Docker Image

        // Add EventBridge Permissions (EventBridge EventBus)
        // Add EventStore Permissions (DynamoDB Table)

    }

}