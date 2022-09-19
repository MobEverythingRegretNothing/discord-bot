import { App } from "aws-cdk-lib";
import { getBotToken } from "../lib/config/environment-config";
import { EventPublisherStack } from "../lib/stacks/event-publisher-stack";
import { EventStoreStack } from "../lib/stacks/event-store-stack";
import { SpandexStack } from "../lib/stacks/spandex-stack";

const app: App = new App();

/**
 * NOTE: This CDK assumes the following environment variables are set:
 * 
 *  - botToken      | Discord token for the bot
 */
const token: string = getBotToken(app);

const eventPublisherStack: EventPublisherStack = new EventPublisherStack(app, 
    'EventPublisherStack', 
    {
        stackName: 'SpandexUnchainedEventPublisherStack', 
        description: 'EventBridge Stack for Discord Event framework',
        env: { 
            account: process.env.CDK_DEFAULT_ACCOUNT, 
            region: process.env.CDK_DEFAULT_REGION 
        }
    }
);

const spandexStack: SpandexStack = new SpandexStack(app, 'SpandexStack', 
{
    stackName: 'SpandexUnchainedStack',
    description: 'Monitor application stack for the Boneyard',
    eventSourceBus: eventPublisherStack.eventPublisher,
    botToken: token,
    env: { 
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION 
    }
});

const eventStoreStack: EventStoreStack = new EventStoreStack(app, 'EventStoreStack', 
{
    stackName: 'SpandexUnchainedEventStoreStack',
    description: 'Event store to hold all discord events',
    eventSourceBus: eventPublisherStack.eventPublisher,
    env: { 
        account: process.env.CDK_DEFAULT_ACCOUNT, 
        region: process.env.CDK_DEFAULT_REGION 
    }
});