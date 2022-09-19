import { App, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import path from 'path';

export interface EventStoreStackProps extends StackProps {
    eventSourceBus: EventBus;
} 
 
/**
 * Infrastructure for EventStore goes in this siloed stack
 */
export class SourceStack extends Stack {

    readonly sourceRepo: Bucket;

    readonly sourceDeployment: BucketDeployment;

    constructor(scope: App, id: string, props: EventStoreStackProps) {
        super(scope, id, props);

        this.sourceRepo = new Bucket(this, 'SpandexSourceRepository', {
            bucketName: `${props.env?.account!}-${props.env?.region!}-SpandexSourceRepository`,
            removalPolicy: RemovalPolicy.DESTROY,
            lifecycleRules: [{expiration: Duration.days(1)}],
            versioned: true
        });

        this.sourceDeployment = new BucketDeployment(this, 'DeploySpandexSourceFiles', {
            sources: [Source.asset(path.join(__dirname, '..', '..', '..', '..', 'spandex-unchained'))],
            destinationBucket: this.sourceRepo
        });
    }

}