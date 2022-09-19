import { App, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus, Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction, EventBus as BusTarget } from 'aws-cdk-lib/aws-events-targets';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';

export interface EventStoreStackProps extends StackProps {
    eventSourceBus: EventBus;
} 
 
/**
 * Infrastructure for EventStore goes in this siloed stack
 */
export class EventStoreStack extends Stack {

    readonly eventStorer: NodejsFunction;

    constructor(scope: App, id: string, props: EventStoreStackProps) {
        super(scope, id, props);

        // Create Lambda Function
        this.eventStorer = new NodejsFunction(this, 'EventStorer', {
            functionName: 'SpandexUnchainedEventStorer',
            description: 'Event Handler Function for Storing to the Event Repo',
            runtime: Runtime.NODEJS_16_X,
            entry: path.join(__dirname, '..', '..', '..', '..', 'event-handlers', 'event-storage', 'src', 'app', 'app-aws.ts'),
            bundling: {
                minify: true,
                sourceMap: true,
                sourceMapMode: SourceMapMode.INLINE
            },
            environment: {
                awsRegion: props.env?.region ?? 'us-west-2',
                eventStoreName: 'NoneCurrently'
            }
        });

        // Trigger lambda from target bus via Rule
        new Rule(this, 'EventStoreTriggerRule', {
            ruleName: 'EventStoreTriggerRule',
            description: 'Rule allowing the event storer lambda to be triggered by the attached bus',
            eventBus: props.eventSourceBus,
            eventPattern: { source: [`SpandexUnchained`] },
            targets: [new LambdaFunction(this.eventStorer)],
            enabled: true
        });
    }

}