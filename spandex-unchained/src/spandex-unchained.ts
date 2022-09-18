import Eris, { 
    TextChannel, 
    Client, Message, 
    User, Emoji, 
    Member, VoiceChannel, OldMember, Guild, MemberPartial,
    Relationship, Presence, PartialUser } from "eris";
import { DiscordEventNotifier } from "./discord-event-notifier";
import { DiscordEvent } from "./packages/discord/discord-event";
import { 
    mapMessageEvent, mapMessageReactionAddEvent, 
    mapUserUpdateEvent, mapPresenceUpdateEvent, mapTypingStartEvent, 
    mapGuildMemberAddEvent, mapGuildMemberUpdateEvent, mapGuildMemberRemoveEvent,
    mapVoiceChannelJoinEvent, mapVoiceChannelLeaveEvent, mapVoiceChannelSwitchEvent 
} from "./packages/discord/discord-event-mapper";

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
            const spandex: Client = Eris(this.botToken, {
                intents: ["all"], 
                autoreconnect: true, 
                maxReconnectAttempts: 3,
                maxResumeAttempts: 3,
                getAllUsers: true
            });

            /***************************
             *  Bot Life-Cycle Events  *
             ***************************/
            spandex.on("ready",  () => {
                console.log("Spandex is Unchained");
            });

            spandex.on("disconnect", () => {
                console.log('Spandex Chained...');
            });

            spandex.on("error", (err) => {
                console.error(`Received Error!`, err);
            });

            /*****************************
             *  User-Interaction Events  *
             *****************************/
             spandex.on("userUpdate", async (user: User, oldUser: PartialUser | null) => {
                console.log(`Received 'userUpdate' for user ${user.username}`);
                const event: DiscordEvent = mapUserUpdateEvent(user, oldUser);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'userUpdate' event`, error);
                    })
            });

            /*****************************
             *  Guild-Interaction Events  *
             *****************************/
            spandex.on("guildMemberAdd", async (guild: Guild, member: Member) => {
                console.log(`Received 'guildMemberAdd' for member ${member.username} in guild ${guild.name}`);
                const event: DiscordEvent = mapGuildMemberAddEvent(guild, member);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'guildMemberAdd' event`, error);
                    })
            });

            spandex.on("guildMemberUpdate", async (guild: Guild, member: Member, oldMember: OldMember | null) => {
                console.log(`Received 'guildMemberUpdate' for member ${member.username} in guild ${guild.name}`);
                const event: DiscordEvent = mapGuildMemberUpdateEvent(guild, member, oldMember);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'guildMemberUpdate' event`, error);
                    })
            });

            spandex.on("guildMemberRemove", async (guild: Guild, member: Member | MemberPartial) => {
                console.log(`Received 'guildMemberRemove' for user ${member.user.username ?? 'None'} in guild ${guild.name}`);
                const event: DiscordEvent = mapGuildMemberRemoveEvent(guild, member);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'guildMemberRemove' event`, error);
                    })
            });

            // Not quite sure what this one does
             spandex.on("presenceUpdate", async (other: Member | Relationship, oldPresence: Presence | null) => {
                console.log(`Received 'presenceUpdate' for user ${other.user.username ?? 'none'}`);
                const event: DiscordEvent = mapPresenceUpdateEvent(other, oldPresence);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'presenceUpdate' event`, error);
                    })
            });

            /*************************************
             *  Text Channel Interaction Events  *
             *************************************/
            spandex.on("typingStart", async (channel: TextChannel, user: User, member: Member) => {
                console.log(`Received 'typingStart' event from user ${user.username} in text channel ${channel.name}`);
                const event: DiscordEvent = mapTypingStartEvent(channel, user, member);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'typingStart' event`, error);
                    })
            });

            spandex.on("messageCreate", async (msg: Message) => {
                console.log(`Received 'messageCreate' event from user ${msg.author.username} w/Message ID ${msg.id}`);
                const event: DiscordEvent = mapMessageEvent(msg);
                
                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'messageCreate' event`, error);
                    });
            });

            spandex.on("messageReactionAdd", async (msg: Message, emoji: Emoji, reactor: Member) => {
                console.log(`Received 'messageReactionAdd' event from user ${reactor.username} w/Message ID ${msg.id}`);
                const event: DiscordEvent = mapMessageReactionAddEvent(msg, emoji, reactor);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'messageReactionAdd' event`, error);
                    })
            });

            /**************************************
             *  Voice Channel Interaction Events  *
             **************************************/
            spandex.on("voiceChannelJoin", async (member: Member, channel: VoiceChannel) => {
                console.log(`Received 'voiceChannelJoin' event from user ${member.username} in text channel ${channel.name}`);
                const event: DiscordEvent = mapVoiceChannelJoinEvent(member, channel);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'voiceChannelJoin' event`, error);
                    })
            });

            spandex.on("voiceChannelLeave", async (member: Member, channel: VoiceChannel) => {
                console.log(`Received 'voiceChannelLeave' event from user ${member.username} in text channel ${channel.name}`);
                const event: DiscordEvent = mapVoiceChannelLeaveEvent(member, channel);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'voiceChannelLeave' event`, error);
                    })
            });

            spandex.on("voiceChannelSwitch", async (member: Member, newChannel: VoiceChannel, oldChannel: VoiceChannel) => {
                console.log(`Received 'voiceChannelSwitch' event from user ${member.username} from channel ${oldChannel.name} to channel ${newChannel.name}`);
                const event: DiscordEvent = mapVoiceChannelSwitchEvent(member, newChannel, oldChannel);

                return this.notifier.notify(event)
                    .catch(error => {
                        console.error(`Failed to properly handle 'voiceChannelSwitch' event`, error);
                    })
            });

            spandex.connect();

        } catch (error) {
            console.error(`Spandex was chained due to error`, error);
        };
    }

}

