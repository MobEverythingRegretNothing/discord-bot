import { App, Environment } from "aws-cdk-lib";
import { getAwsEnvironmentConfig } from "src/lib/config/environment-config";
import { EventPublisherStack } from "src/lib/stacks/event-publisher-stack";
import { EventStoreStack } from "../lib/stacks/event-store-stack";
import { SpandexStack } from "../lib/stacks/spandex-stack";

const app: App = new App();

/**
 * NOTE: This CDK assumes the following environment variables are set:
 * 
 *  - awsRegion     | AWS region to deploy to (ex. 'us-east-2')
 *  - awsAccount    | AWS Account ID to deploy to
 */
const env: Environment = getAwsEnvironmentConfig();

const eventStoreStack: EventStoreStack = new EventStoreStack(app, 'EventStoreStack', 
{
    stackName: 'SpandexUnchainedEventStoreStack',
    description: 'Event store to hold all discord events',
    env
});

const eventPublisherStack: EventPublisherStack = new EventPublisherStack(app, 'EventPublisherStack', {
    stackName: 'SpandexUnchainedEventPublisherStack', 
    description: 'EventBridge Stack for Discord Event framework',
    env
});

const spandexStack: SpandexStack = new SpandexStack(app, 'SpandexStack', 
{
    stackName: 'SpandexUnchainedStack',
    description: 'Monitor application stack for the Boneyard',
    eventStore: eventStoreStack.eventStore,
    eventBridge: eventPublisherStack.eventBridge,
    env
});