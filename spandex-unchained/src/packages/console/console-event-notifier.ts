import { DiscordEventNotifier } from "../../discord-event-notifier";
import { DiscordEvent } from "../discord/discord-event";

export class ConsoleEventNotifier implements DiscordEventNotifier {
    notify(event: DiscordEvent): Promise<void> {
        console.log(`Event notified ${JSON.stringify(event)}`);
        return Promise.resolve();
    }
}