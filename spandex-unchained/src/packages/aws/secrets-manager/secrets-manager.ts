import { SecretsManagerClient, GetSecretValueCommand, GetSecretValueCommandInput, GetSecretValueCommandOutput } from '@aws-sdk/client-secrets-manager';

export class SecretsManager {

    private readonly client: SecretsManagerClient;

    constructor(region: string) {
        this.client = new SecretsManagerClient({region});
    }

    public async get(secret: string): Promise<any> {
        const input: GetSecretValueCommandInput = {
            SecretId: secret
        };

        this.client.send(new GetSecretValueCommand(input))
            .then((output: GetSecretValueCommandOutput) => {
                if (output.SecretString) { return output.SecretString}
                else throw new Error('No Secret Found');
            })
            .catch(error => {
                console.error(`Failed to get secret`);
                throw new Error('Failed');
            });
    } 
}