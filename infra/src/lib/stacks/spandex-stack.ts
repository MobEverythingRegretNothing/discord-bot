import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Instance, MachineImage, Vpc, Peer, Port, SecurityGroup, InstanceType, SubnetType, CloudFormationInit, InitCommand } from 'aws-cdk-lib/aws-ec2';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { ServicePrincipal, Role, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { KeyPair } from 'cdk-ec2-key-pair';

export interface SpandexProps extends StackProps {
    eventSourceBus: EventBus;
    sourceRepo: Bucket;
    botToken: string;
} 
 
export class SpandexStack extends Stack {

    readonly service: Instance;

    constructor(scope: App, id: string, props: SpandexProps) {
        super(scope, id, props);

        // Grab Default VPC
        const defaultVpc = Vpc.fromLookup(this, 'default-vpc', { isDefault: true });

        console.log(`Found Default VPC w/ID ${defaultVpc.vpcId}, ARN ${defaultVpc.vpcArn}`);

        // Create Security Group
        const webserverSG = new SecurityGroup(this, 'webserver-sg', {
            vpc: defaultVpc,
            allowAllOutbound: true
          });

          webserverSG.addIngressRule(
            Peer.anyIpv4(),
            Port.tcp(22),
            'allow HTTP traffic from anywhere'
          );
      
          webserverSG.addIngressRule(
            Peer.anyIpv4(),
            Port.tcp(80),
            'allow HTTP traffic from anywhere'
          );
      
          webserverSG.addIngressRule(
            Peer.anyIpv4(),
            Port.tcp(443),
            'allow HTTPS traffic from anywhere'
          );

        // 👇 create a Role for the EC2 Instance
        const webserverRole = new Role(this, 'webserver-role', {
            assumedBy: new ServicePrincipal('ec2.amazonaws.com'),
            managedPolicies: [
                ManagedPolicy.fromAwsManagedPolicyName('AmazonEventBridgeFullAccess'),
                ManagedPolicy.fromAwsManagedPolicyName('CloudWatchLogsFullAccess')
            ]
        });

        // Create an SSH Key Pair
        const key = new KeyPair(this, 'SpandexEc2KeyPair', {
            name: 'SpandexEc2KeyPair',
            description: 'Key Pair to log into Spandex',
            storePublicKey: true
        });

        // Create EC2 Instance w/Docker Image 
        this.service = new Instance(this, 'SpandexUnchained', {
            instanceName: 'SpandexUnchained',
            instanceType: new InstanceType('t2.nano'), 
            machineImage: MachineImage.latestAmazonLinux(),
            vpc: defaultVpc,
            vpcSubnets: {
                subnetType: SubnetType.PUBLIC
            },
            role: webserverRole,
            securityGroup: webserverSG,
            keyName: key.keyPairName,
            init: CloudFormationInit.fromElements(

                // Update Package Manager
                InitCommand.shellCommand(`sudo yum update -y`),
                
                // Setup Logging
                InitCommand.shellCommand(`sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/amazon_linux/amd64/latest/amazon-cloudwatch-agent.rpm`),
                InitCommand.shellCommand(`sudo rpm -U /opt/amazon-cloudwatch-agent.rpm`),
                InitCommand.shellCommand(`sudo /opt/aws/amazon-cloudwatch-agent/bin/amazon-cloudwatch-agent-ctl -a fetch-config -m ec2 -s -c file:common-config.toml`),

                // Install NodeJS 16 & npm
                InitCommand.shellCommand('sudo yum -y install tar gzip'),
                InitCommand.shellCommand('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash')
            ,
                InitCommand.shellCommand('. ~/.nvm/nvm.sh'),
                InitCommand.shellCommand('nvm install 16'),

                // Retrieve Application
                InitCommand.shellCommand(`aws s3 cp s3://${props.sourceRepo.bucketName} /home/ec2-user/spandex --recursive`),

            //     InitCommand.shellCommand(`yarn --cwd ./app install`),
            //     InitCommand.shellCommand(`yarn --cwd ./app start:local`)
            )
        }
        );

        props.sourceRepo.grantRead(this.service);
    }

}