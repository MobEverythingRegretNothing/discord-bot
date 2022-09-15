import { DiscordEventStore } from "../discord-event-store";
import { DiscordEvent } from "../../../../spandex-unchained/src/packages/discord/discord-event";

export class ConsoleEventStore implements DiscordEventStore {
    store(event: DiscordEvent): Promise<void> {
        console.log(`Event stored: ${JSON.stringify(event)}`);
        return Promise.resolve();
    }
}