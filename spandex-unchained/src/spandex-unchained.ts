import Eris, { Client, Message } from "eris";
import { DiscordEventStore } from "./discord-event-store";
import { DiscordEventNotifier } from "./discord-event-notifier";
import { DiscordConfig } from "./packages/discord/discord-config";
import { DiscordEvent } from "./packages/discord/discord-event";
import { mapMessageEvent } from "./packages/discord/discord-event-mapper";

/**
 * This class represents the bot functionality separated from the deployment environment. Any configuration/implementation should be passed to this class
 * through it's constructor. 
 * 
 *  | notifier: This is the eventing client which will handle notifying subscribers of any relevant events
 *  | store: This is the event storage client which will handle storing to the repository that keeps track of necessary events
 *  | config: This is an object which holds any extra configuration values 
 */
export class SpandexUnchained {

    readonly notifier: DiscordEventNotifier;

    readonly store: DiscordEventStore;

    readonly config: DiscordConfig;

    constructor(notifier: DiscordEventNotifier, store: DiscordEventStore, config: DiscordConfig) {
        this.notifier = notifier;
        this.store = store;
        this.config = config;
    }

    run(): void {
        try {
            const spandex: Client = Eris(this.config.token);

            spandex.on("ready",  () => {
                console.log("Spandex is Unchained");
            });

            spandex.on("messageCreate", async (msg: Message) => {
                console.log(`Received MessageCreate event from user ${msg.author.username} w/ID ${msg.id}`);
                const event: DiscordEvent = mapMessageEvent(msg);
                
                return this.store.store(event)
                    .then(() => {
                        console.log(`Successfully stored event!`);
                        return this.notifier.notify(event);
                    })
                    .then(() => {
                        console.log(`Successfully notified subscribers of Event`);
                    }).catch(error => {
                        console.error(`Failed to properly handle event`, error);
                    });
            });


            spandex.connect();

        } catch (error) {
            console.error(`Spandex was chained due to error`, error);
        };
    }

}

