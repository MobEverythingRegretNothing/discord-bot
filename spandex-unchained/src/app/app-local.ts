import { DiscordEventStore } from "../discord-event-store";
import { clientId } from "../packages/config/local/client";
import { token } from "../packages/config/local/token";
import { ConsoleEventStore } from "../packages/console/console-event-store";
import { DiscordEventNotifier } from "../discord-event-notifier";
import { ConsoleEventNotifier } from "../packages/console/console-event-notifier";
import { SpandexUnchained } from "../spandex-unchained";

const notifier: DiscordEventNotifier = new ConsoleEventNotifier();
const store: DiscordEventStore = new ConsoleEventStore();

const bot: SpandexUnchained = new SpandexUnchained(notifier, store, {token: token, clientId: clientId});

bot.run();