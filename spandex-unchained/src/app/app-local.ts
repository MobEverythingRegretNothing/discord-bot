import { token } from "../packages/config/local/token";
import { DiscordEventNotifier } from "../discord-event-notifier";
import { ConsoleEventNotifier } from "../packages/console/console-event-notifier";
import { SpandexUnchained } from "../spandex-unchained";

const notifier: DiscordEventNotifier = new ConsoleEventNotifier();

const bot: SpandexUnchained = new SpandexUnchained(notifier, token);

bot.run();