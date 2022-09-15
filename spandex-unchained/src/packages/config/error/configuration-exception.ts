import { ErrorIdentifier } from "./error-identifier";
import { WrappedError } from "./wrapped-error";
export class ConfigurationError extends WrappedError {

    constructor(description: string, element: string) {
        super(description, 'Configuration Error', 
        [new ErrorIdentifier('Config Element', element)]);
    }

}