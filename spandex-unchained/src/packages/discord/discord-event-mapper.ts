import { Message } from "eris";
import { DiscordEvent } from "./discord-event";
import { DateTime } from 'luxon';

export function mapMessageEvent(msg: Message): DiscordEvent {

    return {
        id: msg.id,
        channelId: msg.channel.id,
        type: "MessageCreated",
        timestamp: DateTime.fromMillis(msg.timestamp),
        metadata: msg
    };
}
