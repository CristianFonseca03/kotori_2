import {
  Message,
  VoiceChannel,
  Client,
  Guild,
  GuildMember,
  User,
  ClientUser,
  VoiceState,
  UserFlagsBitField,
  VoiceBasedChannel,
  Collection,
  Snowflake,
  Role,
  GuildMemberRoleManager,
} from 'discord.js';

const mockUserFlags = new UserFlagsBitField();

export const createMockUser = (overrides: Partial<User> = {}): User => {
  const id = '987654321';
  return {
    id,
    username: 'TestUser',
    discriminator: '1234',
    tag: 'TestUser#1234',
    bot: false,
    system: false,
    flags: mockUserFlags,
    avatar: null,
    accentColor: null,
    banner: null,
    toString: () => `<@${id}>` as `<@${string}>`,
    valueOf: () => id,
    ...overrides,
  } as User;
};

export const createMockGuild = (overrides: Partial<Guild> = {}): Guild => {
  const id = '123456789';
  return {
    id,
    name: 'Test Guild',
    channels: new Collection<Snowflake, VoiceChannel>(),
    roles: new Collection(),
    members: new Collection(),
    toString: () => `<#${id}>` as `<#${string}>`,
    valueOf: () => id,
    ...overrides,
  } as Guild;
};

export const createMockVoiceChannel = (overrides: Partial<VoiceChannel> = {}): VoiceChannel => {
  const id = '123456789';
  return {
    id,
    name: 'Test Voice Channel',
    type: 2,
    guild: createMockGuild(),
    joinable: true,
    bitrate: 64000,
    userLimit: 0,
    full: false,
    members: new Collection<Snowflake, GuildMember>(),
    toString: () => `<#${id}>` as `<#${string}>`,
    valueOf: () => id,
    ...overrides,
  } as VoiceChannel;
};

// Creamos una versión básica del VoiceState sin dependencias circulares
const createBasicVoiceState = (channel: VoiceBasedChannel | null = null): Partial<VoiceState> => ({
  channelId: channel?.id ?? null,
  channel,
  deaf: false,
  id: '123456789',
  mute: false,
  serverDeaf: false,
  serverMute: false,
  selfDeaf: false,
  selfMute: false,
  selfVideo: false,
  streaming: false,
  suppress: false,
  sessionId: '123456789',
  valueOf: () => '123456789',
});

// Mock básico para Role
const mockRole = {
  id: '123456789',
  name: 'Test Role',
  color: 0,
  hoist: false,
  position: 1,
  permissions: BigInt(0),
  managed: false,
  mentionable: false,
  tags: null,
  guild: null,
  members: new Collection(),
  toString: () => `<@&123456789>`,
  valueOf: () => '123456789',
  createdAt: new Date(),
  createdTimestamp: Date.now(),
  editable: false,
  flags: new UserFlagsBitField(),
  hexColor: '#000000',
  icon: null,
  unicodeEmoji: null,
} as unknown as Role;

// Creamos una versión básica del GuildMember sin dependencias circulares
const createBasicGuildMember = (): Partial<GuildMember> => {
  const guild = createMockGuild();
  const id = '987654321';

  // Creamos el roleManager primero
  const roleManager = {
    cache: new Collection<string, Role>([['123456789', mockRole]]),
    highest: mockRole,
    hoist: mockRole,
    color: mockRole,
    icon: null,
    premiumSubscriberRole: null,
    botRole: null,
    guild: guild,
    add: jest.fn(),
    remove: jest.fn(),
    set: jest.fn(),
    resolve: jest.fn(),
    resolveId: jest.fn(),
    client: null,
  } as unknown as GuildMemberRoleManager;

  // Creamos una versión parcial del member con _roles
  const member = {
    id,
    displayName: 'Test Member',
    guild,
    roles: roleManager,
  } as unknown as Partial<GuildMember>;

  // Definimos toString y valueOf como propiedades no enumerables
  Object.defineProperties(member, {
    toString: {
      value: () => `<@${id}>` as `<@${string}>`,
      writable: true,
      enumerable: false,
      configurable: true,
    },
    valueOf: {
      value: () => id,
      writable: true,
      enumerable: false,
      configurable: true,
    },
  });

  // Agregamos _roles como propiedad no enumerable
  Object.defineProperty(member, '_roles', {
    value: ['123456789'],
    writable: true,
    enumerable: false,
    configurable: true,
  });

  return member;
};

export const createMockVoiceState = (channel: VoiceBasedChannel | null = null): VoiceState => {
  const guild = createMockGuild();
  const basicMember = createBasicGuildMember();
  const id = '123456789';
  return {
    ...createBasicVoiceState(channel),
    guild,
    member: basicMember as GuildMember,
    toString: () => `<@${id}>` as `<@${string}>`,
    valueOf: () => id,
  } as VoiceState;
};

export const createMockGuildMember = (overrides: Partial<GuildMember> = {}): GuildMember => {
  const guild = createMockGuild();
  const voiceState = createBasicVoiceState();
  const id = '987654321';

  // Creamos el member base
  const baseMember = createBasicGuildMember();

  // Creamos el member final con todas las propiedades
  const member = {
    ...baseMember,
    guild,
    voice: voiceState as VoiceState,
    user: createMockUser(),
    ...overrides,
  };

  // Definimos toString y valueOf como propiedades no enumerables
  Object.defineProperties(member, {
    toString: {
      value: () => `<@${id}>` as `<@${string}>`,
      writable: true,
      enumerable: false,
      configurable: true,
    },
    valueOf: {
      value: () => id,
      writable: true,
      enumerable: false,
      configurable: true,
    },
  });

  // Aseguramos que _roles esté presente
  if (!('_roles' in member)) {
    Object.defineProperty(member, '_roles', {
      value: ['123456789'],
      writable: true,
      enumerable: false,
      configurable: true,
    });
  }

  return member as unknown as GuildMember;
};

export const createMockMessage = (overrides: Partial<Message> = {}): Message => {
  const guild = createMockGuild();
  const member = createMockGuildMember();
  const id = '123456789';

  // Creamos el mensaje base
  const baseMessage = {
    id,
    content: '',
    createdTimestamp: Date.now(),
    guild,
    member,
    channel: {
      id,
      send: jest.fn(),
    },
    author: createMockUser(),
    reply: jest.fn().mockImplementation(() => {
      const replyMsg = {
        id,
        createdTimestamp: Date.now(),
        toString: () => `<#${id}>`,
        valueOf: () => id,
      };
      return Promise.resolve(replyMsg as Message);
    }),
  };

  // Agregamos las propiedades de string y el override
  const message = {
    ...baseMessage,
    ...overrides,
  };

  // Definimos toString y valueOf como propiedades no enumerables
  Object.defineProperties(message, {
    toString: {
      value: () => `<#${id}>` as `<#${string}>`,
      writable: true,
      enumerable: false,
      configurable: true,
    },
    valueOf: {
      value: () => id,
      writable: true,
      enumerable: false,
      configurable: true,
    },
  });

  return message as Message;
};

export const createMockClientUser = (overrides: Partial<ClientUser> = {}): ClientUser => {
  const id = '123456789';
  return {
    id,
    username: 'TestBot',
    discriminator: '0000',
    tag: 'TestBot#0000',
    bot: true,
    system: false,
    flags: mockUserFlags,
    avatar: null,
    accentColor: null,
    banner: null,
    mfaEnabled: false,
    verified: true,
    toString: () => `<@${id}>` as `<@${string}>`,
    valueOf: () => id,
    ...overrides,
  } as ClientUser;
};

export const createMockClient = (overrides: Partial<Client> = {}): Partial<Client> => ({
  user: createMockClientUser(),
  ...overrides,
});
