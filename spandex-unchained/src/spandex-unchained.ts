import Eris, { Client, Message } from "eris";
import { DiscordEventNotifier } from "./discord-event-notifier";
import { DiscordEvent } from "./packages/discord/discord-event";
import { mapMessageEvent } from "./packages/discord/discord-event-mapper";

/**
 * This class represents the bot functionality separated from the deployment environment. Any configuration/implementation should be passed to this class
 * through it's constructor. 
 * 
 *  | notifier: This is the eventing client which will handle notifying subscribers of any relevant events
 *  | config: This is an object which holds any extra configuration values 
 */
export class SpandexUnchained {

    private readonly notifier: DiscordEventNotifier;

    private readonly botToken: string;

    constructor(notifier: DiscordEventNotifier, botToken: string) {
        this.notifier = notifier;
        this.botToken = botToken;
    }

    run(): void {
        try {
            const spandex: Client = Eris(this.botToken);

            spandex.on("ready",  () => {
                console.log("Spandex is Unchained");
            });

            spandex.on("messageCreate", async (msg: Message) => {
                console.log(`Received MessageCreate event from user ${msg.author.username} w/ID ${msg.id}`);
                const event: DiscordEvent = mapMessageEvent(msg);
                
                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle event`, error);
                    });
            });


            spandex.connect();

        } catch (error) {
            console.error(`Spandex was chained due to error`, error);
        };
    }

}

