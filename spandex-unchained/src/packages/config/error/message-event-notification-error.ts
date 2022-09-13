import { ErrorIdentifier } from "./error-identifier";
import { WrappedError } from "./wrapped-error";


export class MessageEventNotificationError extends WrappedError {

        constructor(description: string, type: string, id: string) {
            super(description, 'Message Event Notification Error', 
            [
                new ErrorIdentifier('Message ID', id),
                new ErrorIdentifier('Message Type', type)
            ]);
        }

}