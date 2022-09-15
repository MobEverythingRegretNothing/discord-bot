import { DiscordEvent } from "./packages/discord/discord-event";

export interface DiscordEventStore {

    store(event: DiscordEvent): Promise<void>;

}