import { Environment } from "aws-cdk-lib";

export function getAwsEnvironmentConfig(): Environment {
    return {
        account: env('awsAccount'),
        region: env('awsRegion')
    }
}

function env(paramName: string): string {
    if (process.env[paramName] === undefined) {
        throw new Error(`Environment Variable ${paramName} is undefined, please see CICD pipeline`)
    } else {
        return process.env[paramName]!;
    }
}