import { DiscordEvent } from "./packages/discord/discord-event";

export interface DiscordEventNotifier {

    notify(event: DiscordEvent): Promise<void>;

}