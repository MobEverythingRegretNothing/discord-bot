import { App, Environment } from "aws-cdk-lib";

export function getAwsEnvironmentConfig(app: App): Environment {
    return {
        account: env(app, 'awsAccount'),
        region:  env(app, 'awsRegion')
    }
}

export function getBotToken(app: App): string {
    return env(app, 'botToken');
}

function env(app: App, paramName: string): string {
    if (app.node.tryGetContext(paramName) === undefined) {
        throw new Error(`Context Variable ${paramName} is undefined, please see CICD pipeline`)
    } else {
        return app.node.tryGetContext(paramName)!;
    }
}