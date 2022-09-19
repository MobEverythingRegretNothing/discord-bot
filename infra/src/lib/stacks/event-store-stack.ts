import { App, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus, Rule } from 'aws-cdk-lib/aws-events';
import { LambdaFunction } from 'aws-cdk-lib/aws-events-targets';
import { NodejsFunction, SourceMapMode } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';
 
/**
 * Infrastructure for EventStore goes in this siloed stack
 */
export class EventStoreStack extends Stack {

    // readonly eventStore: Table;

    readonly eventStorer: NodejsFunction;

    readonly targetBus: EventBus;

    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);

        // Create Lambda Function
        this.eventStorer = new NodejsFunction(this, 'EventStorer', {
            description: '',
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

        // Create Target Event Bus to receive Discord Events
        this.targetBus = new EventBus(this, 'EventStoreTargetBus', {
            eventBusName: 'EventStoreTargetBus'
        });

        // Trigger lambda from target bus via Rule
        new Rule(this, `EventStoreTriggerRule`, {
            enabled: true,
            description: 'Rule allowing the event storer lambda to be triggered by the attached bus',
            eventBus: this.targetBus,
            eventPattern: { source: [`aws.ec2`] },
            targets: [new LambdaFunction(this.eventStorer)]
        })
    }

}