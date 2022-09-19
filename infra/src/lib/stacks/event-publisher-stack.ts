import { App, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus, Rule } from 'aws-cdk-lib/aws-events';
import { EventBus as EventBusTarget, CloudWatchLogGroup } from 'aws-cdk-lib/aws-events-targets';
import { LogGroup } from 'aws-cdk-lib/aws-logs';
 
/**
 * Infrastructure for EventPublisher goes in this siloed stack
 */
export class EventPublisherStack extends Stack {

    readonly eventPublisher: EventBus;

    constructor(scope: App, id: string, props: StackProps) {
        super(scope, id, props);

        // Create Source Event Bus
        this.eventPublisher = new EventBus(this, 'SpandexEventBus', {
            eventBusName: 'SpandexUnchainedEventBus'
        });

        // Configure Source Event Bus
        this.eventPublisher.applyRemovalPolicy(RemovalPolicy.DESTROY);

        // Create rule to log out all events to CloudWatch
        const eventLogs = new LogGroup(this, "EventLogs", {
            logGroupName: "EventLogs",
        });

        new Rule(this, "EventLoggingRule", {
            eventBus: this.eventPublisher,
            eventPattern: {
                source: ["aws.ec2"]
            },
            targets: [
              new CloudWatchLogGroup(eventLogs),
            ],
          });
    }

}