import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Instance, MachineImage, Vpc, Peer, Port, SecurityGroup, InstanceType, SubnetType, CloudFormationInit, InitConfig, InitPackage, InitFile, InitCommand } from 'aws-cdk-lib/aws-ec2';
import { EventBus } from 'aws-cdk-lib/aws-events';
import { ServicePrincipal, Role, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import { Asset } from 'aws-cdk-lib/aws-s3-assets';
import { KeyPair } from 'cdk-ec2-key-pair';
import { readFileSync } from 'fs';
import path from 'path';

export interface SpandexProps extends StackProps {
    eventSourceBus: EventBus;
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
            ]
        });

        // Create an SSH Key Pair
        const key = new KeyPair(this, 'A-Key-Pair', {
            name: 'SpandexKeyPair',
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
            // init: CloudFormationInit.fromElements(
            //     InitCommand.shellCommand('yum -y install tar gzip'),
            //     InitCommand.shellCommand('sL https://rpm.nodesource.com/setup_${NODE_VERSION} | bash'),
            //     InitCommand.shellCommand('yum -y install nodejs'),
            //     InitCommand.shellCommand('npm install -g yarn'),
            //     InitCommand.shellCommand('mkdir app'),
            //     InitCommand.shellCommand(`aws s3 cp s3://${props.env?.account}-${props.env?.region}-spandex-source-repo ./app --recursive`),
            //     InitCommand.shellCommand(`yarn --cwd ./app install`),
            //     InitCommand.shellCommand(`yarn --cwd ./app start:local`)
            // )
        }
        );
    }

}