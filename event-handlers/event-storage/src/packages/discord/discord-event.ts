import { DateTime } from "luxon";

/**
 * Generic holder for Discord Events
 */
export interface DiscordEvent {
    
    type: string;

    id: string;

    channelId: string;

    timestamp: DateTime;

    metadata: any;

}