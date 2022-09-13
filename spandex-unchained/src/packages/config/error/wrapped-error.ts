import { ErrorIdentifier } from "./error-identifier";

export class WrappedError extends Error {

    private errorType: string;
    cause: Error | undefined;
    private identifiers: ErrorIdentifier[];

    constructor(message: string, errorType: string, identifiers: ErrorIdentifier[]) {
        const trueProto = new.target.prototype;
        super(message);

        this.errorType = errorType;
        this.identifiers = identifiers;
        Object.setPrototypeOf(this, trueProto);
    }

    withCause(error: Error): WrappedError {
        this.cause = error;
        this.stack += `\nCaused by: ${error.stack}`;
        this.identifiers = mergeIdentifiers(this.identifiers, error);
        this.errorType = mergeType(this.errorType, error);
        return this;
    }

    getErrorType(): string {
        return this.errorType ?? 'Unknown Error';
    }

    getTopErrorType(): string {
        return this.getErrorType().split('::')[0] ?? this.getErrorType();
    }

    getCause(): Error | undefined {
        return this.cause;
    }

    getMessage(): string {
        return this.message;
    }

    getIdentifiers(): ErrorIdentifier[] {
        return this.identifiers;
    }
 }

 function mergeType(type: string, error?: Error): string {
     return (error && error instanceof WrappedError) ? `${type}::${error.getErrorType}` : type;
 }

 function mergeIdentifiers(identifiers?: ErrorIdentifier[], error?: Error): ErrorIdentifier[] {
    if (error && error instanceof WrappedError) {
        return [...error.getIdentifiers(), ...(identifiers ?? []).filter(id => !error.getIdentifiers().map(eid => eid.name).includes(id.name))];
    } else {
        return identifiers ?? [];
    }
 }