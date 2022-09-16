import { Message, TextChannel, User, Emoji, Member, VoiceChannel, Presence, Relationship, PartialUser, Guild, OldMember, MemberPartial } from "eris";
import { DiscordEvent } from "./discord-event";
import { DateTime } from 'luxon';
import { v4 as uuidv4 } from 'uuid';

/*****************************
 *  User-Interaction Events  *
 *****************************/
 export function mapUserUpdateEvent(user: User, oldUser: PartialUser | null): DiscordEvent {
    return {
        id: uuidv4(),
        type: "UserUpdate",
        timestamp: DateTime.now(),
        sourceEntity: { type: 'User', id: user.id},
        targetEntity: { type: 'User', id: user.id},
        content: `${user.id} updated`,
        metadata: { user, oldUser }
    };
}

/*****************************
 *  Guild-Interaction Events  *
 *****************************/
export function mapGuildMemberAddEvent(guild: Guild, member: Member): DiscordEvent {
    return {
        id: uuidv4(),
        type: "GuildMemberAdd",
        timestamp: DateTime.now(),
        targetGuildId: guild.id,
        sourceEntity: { type: 'Member', id: guild.ownerID },
        targetEntity: { type: 'Member', id: member.id },
        content: `${member.username} added to guild ${guild.name}`,
        metadata: { guild, member }
    };
}

export function mapGuildMemberUpdateEvent(guild: Guild, member: Member, oldMember: OldMember | null): DiscordEvent {
    return {
        id: uuidv4(),
        type: "GuildMemberUpdate",
        timestamp: DateTime.now(),
        targetGuildId: guild.id,
        sourceEntity: { type: 'Member', id: guild.ownerID },
        targetEntity: { type: 'Member', id: member.id },
        content: `${member.username} updated for guild ${guild.name}`,
        metadata: { guild, member, oldMember }
    };
}

export function mapGuildMemberRemoveEvent(guild: Guild, member: Member | MemberPartial): DiscordEvent {
    return {
        id: uuidv4(),
        type: "GuildMemberRemove",
        timestamp: DateTime.now(),
        targetGuildId: guild.id,
        sourceEntity: { type: 'Member', id: guild.ownerID },
        targetEntity: { type: 'Member', id: member.id },
        content: `${member.id} removed for guild ${guild.name}`,
        metadata: { guild, member }
    };

}

export function mapPresenceUpdateEvent(other: Member | Relationship, oldPresence: Presence | null): DiscordEvent {
    return {
        id: uuidv4(),
        type: "PresenceUpdate",
        timestamp: DateTime.now(),
        sourceEntity: { type: 'User', id: other.user.id },
        content: `${other.user.username} changed their presence`,
        metadata: { other, oldPresence }
    };
}

/*************************************
 *  Text Channel Interaction Events  *
 *************************************/
 export function mapTypingStartEvent(channel: TextChannel, user: User, member: Member): DiscordEvent {
    return {
        id: uuidv4(),
        type: "TypingStart",
        timestamp: DateTime.now(),
        targetGuildId: member.guild.id,
        targetChannelId: channel.id,
        sourceEntity: { type: 'Member', id: member.id },
        content: `${user.username} is typing...`,
        metadata: { channel, user, member }
    };
}

export function mapMessageEvent(message: Message): DiscordEvent {
    return {
        id: uuidv4(),
        type: "MessageCreated",
        timestamp: DateTime.fromMillis(message.timestamp),
        targetChannelId: message.channel.id,
        targetMessageId: message.id,
        sourceEntity: { type: 'User', id: message.author.id },
        content: message.content,
        metadata: { message }
    };
}

export function mapMessageReactionAddEvent(message: Message, emoji: Emoji, reactor: Member): DiscordEvent {
    return {
        id: uuidv4(),
        type: "MessageReactionAdd",
        timestamp: DateTime.fromMillis(message.timestamp),
        targetChannelId: message.channel.id,
        targetMessageId: message.id,
        sourceEntity: { type: 'Member', id: reactor.id },
        targetEntity: { type: 'User', id: message.author.id },
        content: JSON.stringify(emoji),
        metadata: { message, emoji, reactor }
    };
}

/**************************************
 *  Voice Channel Interaction Events  *
 **************************************/
export function mapVoiceChannelJoinEvent(member: Member, channel: VoiceChannel): DiscordEvent {
    return {
        id: uuidv4(),
        type: "VoiceChannelJoin",
        timestamp: DateTime.now(),
        targetGuildId: member.guild.id,
        targetChannelId: channel.id,
        sourceEntity: { type: 'Member', id: member.id },
        content: `${member.username} joined the ${channel.name} channel`,
        metadata: { member, channel }
    };
}

export function mapVoiceChannelLeaveEvent(member: Member, channel: VoiceChannel): DiscordEvent {
    return {
        id: uuidv4(),
        type: "VoiceChannelLeave",
        timestamp: DateTime.now(),
        targetGuildId: member.guild.id,
        targetChannelId: channel.id,
        sourceEntity: { type: 'Member', id: member.id },
        content: `${member.username} left the ${channel.name} channel`,
        metadata: { member, channel }
    };
}

export function mapVoiceChannelSwitchEvent(member: Member, newChannel: VoiceChannel, oldChannel: VoiceChannel): DiscordEvent {
    return {
        id: uuidv4(),
        type: "VoiceChannelSwitch",
        timestamp: DateTime.now(),
        targetGuildId: member.guild.id,
        targetChannelId: newChannel.id,
        sourceEntity: { type: 'Member', id: member.id },
        content: `${member.username} switched from channel ${oldChannel.name} to channel ${newChannel}`,
        metadata: { member, newChannel, oldChannel }
    };
}
