# Event Router | Spandex Unchained

    This logs in as the `Spandex Unchained` bot and listens to the Discord WebSocket API for events. It then routes those events to an AWS EventBridge Bus which allows subscribers to react.

## Discord Event Types
---

    callCreate: [call: Call];
    callDelete: [call: Call];
    callRing: [call: Call];
    callUpdate: [call: Call, oldCall: OldCall];
    channelCreate: [channel: AnyGuildChannel];
    channelDelete: [channel: AnyChannel];
    channelPinUpdate: [channel: TextableChannel, timestamp: number, oldTimestamp: number];
    channelRecipientAdd: [channel: GroupChannel, user: User];
    channelRecipientRemove: [channel: GroupChannel, user: User];
    channelUpdate: [channel: AnyGuildChannel, oldChannel: OldGuildChannel | OldGuildTextChannel | OldTextVoiceChannel]
    | [channel: GroupChannel, oldChannel: OldGroupChannel];
    connect: [id: number];
    debug: [message: string, id?: number];
    disconnect: [];
    error: [err: Error, id?: number];
    friendSuggestionCreate: [user: User, reasons: FriendSuggestionReasons];
    friendSuggestionDelete: [user: User];
    guildAvailable: [guild: Guild];
    guildBanAdd: [guild: Guild, user: User];
    guildBanRemove: [guild: Guild, user: User];
    guildCreate: [guild: Guild];
    guildDelete: [guild: PossiblyUncachedGuild];
    guildEmojisUpdate: [guild: PossiblyUncachedGuild, emojis: Emoji[], oldEmojis: Emoji[] | null];
    guildMemberAdd: [guild: Guild, member: Member];
    guildMemberChunk: [guild: Guild, member: Member[]];
    guildMemberRemove: [guild: Guild, member: Member | MemberPartial];
    guildMemberUpdate: [guild: Guild, member: Member, oldMember: OldMember | null];
    guildRoleCreate: [guild: Guild, role: Role];
    guildRoleDelete: [guild: Guild, role: Role];
    guildRoleUpdate: [guild: Guild, role: Role, oldRole: OldRole];
    guildStickersUpdate: [guild: PossiblyUncachedGuild, stickers: Sticker[], oldStickers: Sticker[] | null];
    guildUnavailable: [guild: UnavailableGuild];
    guildUpdate: [guild: Guild, oldGuild: OldGuild];
    hello: [trace: string[], id: number];
    interactionCreate: [interaction: PingInteraction | CommandInteraction | ComponentInteraction | AutocompleteInteraction | UnknownInteraction];
    inviteCreate: [guild: Guild, invite: Invite];
    inviteDelete: [guild: Guild, invite: Invite];
    messageCreate: [message: Message<PossiblyUncachedTextableChannel>];
    messageDelete: [message: PossiblyUncachedMessage];
    messageDeleteBulk: [messages: PossiblyUncachedMessage[]];
    messageReactionAdd: [message: PossiblyUncachedMessage, emoji: PartialEmoji, reactor: Member | Uncached];
    messageReactionRemove: [message: PossiblyUncachedMessage, emoji: PartialEmoji, userID: string];
    messageReactionRemoveAll: [message: PossiblyUncachedMessage];
    messageReactionRemoveEmoji: [message: PossiblyUncachedMessage, emoji: PartialEmoji];
    messageUpdate: [message: Message<PossiblyUncachedTextableChannel>, oldMessage: OldMessage | null];
    presenceUpdate: [other: Member | Relationship, oldPresence: Presence | null];
    rawREST: [request: RawRESTRequest];
    rawWS: [packet: RawPacket, id: number];
    ready: [];
    relationshipAdd: [relationship: Relationship];
    relationshipRemove: [relationship: Relationship];
    relationshipUpdate: [relationship: Relationship, oldRelationship: { type: number }];
    shardPreReady: [id: number];
    stageInstanceCreate: [stageInstance: StageInstance];
    stageInstanceDelete: [stageInstance: StageInstance];
    stageInstanceUpdate: [stageInstance: StageInstance, oldStageInstance: OldStageInstance | null];
    threadCreate: [channel: AnyThreadChannel];
    threadDelete: [channel: AnyThreadChannel];
    threadListSync: [guild: Guild, deletedThreads: (AnyThreadChannel | Uncached)[], activeThreads: AnyThreadChannel[], joinedThreadsMember: ThreadMember[]];
    threadMembersUpdate: [channel: AnyThreadChannel, addedMembers: ThreadMember[], removedMembers: (ThreadMember | Uncached)[]];
    threadMemberUpdate: [channel: AnyThreadChannel, member: ThreadMember, oldMember: OldThreadMember];
    threadUpdate: [channel: AnyThreadChannel, oldChannel: OldThread | null];
    typingStart: [channel: GuildTextableChannel | Uncached, user: User | Uncached, member: Member]
    | [channel: PrivateChannel | Uncached, user: User | Uncached, member: null];
    unavailableGuildCreate: [guild: UnavailableGuild];
    unknown: [packet: RawPacket, id?: number];
    userUpdate: [user: User, oldUser: PartialUser | null];
    voiceChannelJoin: [member: Member, channel: AnyVoiceChannel];
    voiceChannelLeave: [member: Member, channel: AnyVoiceChannel];
    voiceChannelSwitch: [member: Member, newChannel: AnyVoiceChannel, oldChannel: AnyVoiceChannel];
    voiceStateUpdate: [member: Member, oldState: OldVoiceState];
    warn: [message: string, id?: number];
    webhooksUpdate: [data: WebhookData];