declare module 'shoukaku' {
  import { EventEmitter } from "events";
  import { Client as DiscordClient, Base64String, Guild } from 'discord.js';

  export const version: string;

  export class ShoukakuError extends Error {
    constructor(message: string);
    public name: string;
  }

  export class ShoukakuTimeout extends Error {
    constructor(message: string);
    public name: string;
  }

  export class ShoukakuUtil {
    public static mergeDefault(def: Object, given: Object): Object;
    public static searchType(string: string): string;
    public static websocketSend(ws: WebSocket, payload: Object): Promise<void>;
  }

  export class ShoukakuTrackList {
    type: string;
    playlistName?: string;
    tracks: Array<ShoukakuTrack>;
  }

  export class ShoukakuTrack {
    track: string;
    info: {
      identifier?: string;
      isSeekable?: boolean;
      author?: string;
      length?: number;
      isStream?: boolean;
      position?: number;
      title?: string;
      uri?: string;
    };
  }

  export type Source = 'youtube' | 'soundcloud';

  export enum ShoukakuStatus {
    CONNECTING = 'CONNECTING',
    CONNECTED = 'CONNECTED',
    DISCONNECTING = 'DISCONNECTING',
    DISCONNECTED = 'DISCONNECTED',
  }

  export interface Reason {
    op: string;
    reason: string;
    code: number;
    byRemote: boolean;
    type: string;
    guildId: string;
  }

  export interface PlayerUpdate {
    op: "playerUpdate";
    guildId: string;
    state: {
      time: number;
      position: number;
    }
  }

  export interface ShoukakuNodeStats {
    playingPlayers: number;
    op: 'stats';
    memory: {
      reservable: number;
      used: number;
      free: number;
      allocated: number;
    };
    frameStats: {
      sent: number;
      deficit: number;
      nulled: number;
    };
    players: number;
    cpu: {
      cores: number;
      systemLoad: number;
      lavalinkLoad: number;
    };
    uptime: number;
  }

  export interface ShoukakuJoinOptions {
    guildID: string;
    voiceChannelID: string;
    mute?: boolean;
    deaf?: boolean;
  }

  export interface ShoukakuPlayOptions {
    noReplace?: boolean,
    startTime?: number;
    endTime?: number;
  }

  export interface ShoukakuOptions {
    resumable?: boolean;
    resumableTimeout?: number;
    reconnectTries?: number;
    moveOnDisconnect?: boolean;
    restTimeout?: number;
  }

  export interface ShoukakuNodeOptions {
    name: string;
    host: string;
    port: number;
    auth: string;
    group?: string;
  }

  export interface EqualizerBand {
    band: number;
    gain: number;
  }

  export interface KaraokeValue {
    level?: number;
    monoLevel?: number;
    filterBand?: number;
    filterWidth?: number;
  }

  export interface RotationValue {
    speed?: number;
  }

  export interface TimescaleValue {
    speed?: number;
    pitch?: number;
    rate?: number;
  }

  export interface TremoloValue {
    frequency?: number;
    depth?: number;
  }

  export interface VibratoValue {
    frequency?: number;
    depth?: number;
  }

  export interface LowPassValue {
    smoothing?: number;
  }

  export interface ChannelMixValue {
    leftToRight?: number;
    rightToRight?: number;
    rightToLeft?: number;
    leftToLeft?: number;
  }

  class ShoukakuConstants {
    static ShoukakuStatus: ShoukakuStatus;
    static ShoukakuNodeStats: ShoukakuNodeStats;
    static ShoukakuJoinOptions: ShoukakuJoinOptions;
    static ShoukakuPlayOptions: ShoukakuPlayOptions;
    static ShoukakuOptions: ShoukakuOptions;
    static ShoukakuNodeOptions: ShoukakuNodeOptions;
    static ShoukakuNodes: Array<ShoukakuNodeOptions>;
    static EqualizerBand: EqualizerBand;
    static KaraokeValue: KaraokeValue;
    static TimescaleValue: TimescaleValue;
    static TremoloValue: TremoloValue;
    static VibratoValue: VibratoValue;
    static RotationValue: RotationValue;
    static LowPassValue: LowPassValue;
    static ChannelMixValue: ChannelMixValue;
  }

  export { ShoukakuConstants as Constants };

  export class ShoukakuFilter {
    public volume: number;
    public equalizer: EqualizerBand[];
    public karaoke?: KaraokeValue;
    public timescale?: TimescaleValue;
    public tremolo?: TremoloValue;
    public vibrato?: VibratoValue;
    public rotation?: RotationValue;
    public lowPass?: LowPassValue;
    public channelMix?:ChannelMixValue;
  }
  
  export class ShoukakuGroupedFilterOptions {
    public volume?: number;
    public equalizer?: EqualizerBand[];
    public karaoke?: KaraokeValue;
    public timescale?: TimescaleValue;
    public tremolo?: TremoloValue;
    public vibrato?: VibratoValue;
    public rotation?: RotationValue;
    public lowPass?: LowPassValue;
    public channelMix?:ChannelMixValue;
  }

  export class ShoukakuRest {
    constructor(host: string, port: string, auth: string, timeout: number);
    private auth: string;
    public timeout: number;
    public url: string;

    public resolve(identifier: string, search?: Source): Promise<ShoukakuTrackList | null>;
    public decode(track: Base64String): Promise<Object>;
    public getRoutePlannerStatus(): Promise<Object>;
    public unmarkFailedAddress(address: string): Promise<number>;
    public unmarkAllFailedAddress(): Promise<number>;

    private _getFetch(url: string): Promise<JSON>;
    private _postFetch(url: string, body: Object): Promise<number>;
  }

  export interface ShoukakuPlayer {
    on(event: 'end', listener: (reason: Reason) => void): this;
    on(event: 'error', listener: (err: ShoukakuError | Error) => void): this;
    on(event: 'nodeDisconnect', listener: (name: string) => void): this;
    on(event: 'resumed', listener: () => void): this;
    on(event: 'playerUpdate', listener: (data: PlayerUpdate) => void): this;
    on(event: 'trackException', listener: (data: unknown) => void): this;
    on(event: 'closed', listener: (data: unknown) => void): this;
    on(event: 'start', listener: (data: unknown) => void): this;
    once(event: 'end', listener: (reason: Reason) => void): this;
    once(event: 'error', listener: (err: ShoukakuError | Error) => void): this;
    once(event: 'nodeDisconnect', listener: (name: string) => void): this;
    once(event: 'resumed', listener: () => void): this;
    once(event: 'playerUpdate', listener: (data: PlayerUpdate) => void): this;
    once(event: 'trackException', listener: (data: unknown) => void): this;
    once(event: 'closed', listener: (data: unknown) => void): this;
    once(event: 'start', listener: (data: unknown) => void): this;
    off(event: 'end', listener: (reason: Reason) => void): this;
    off(event: 'error', listener: (err: ShoukakuError | Error) => void): this;
    off(event: 'nodeDisconnect', listener: (name: string) => void): this;
    off(event: 'resumed', listener: () => void): this;
    off(event: 'playerUpdate', listener: (data: PlayerUpdate) => void): this;
    off(event: 'trackException', listener: (data: unknown) => void): this;
    off(event: 'closed', listener: (data: unknown) => void): this;
    off(event: 'start', listener: (data: unknown) => void): this;
  }

  export class ShoukakuPlayer extends EventEmitter {
    constructor(node: ShoukakuSocket, guild: Guild);
    public voiceConnection: ShoukakuLink;
    public track: string | null;
    public paused: boolean;
    public position: number;
    public filters: ShoukakuFilter;

    public disconnect(): void;
    public moveToNode(name: string): Promise<ShoukakuPlayer>;
    public playTrack(track: string | ShoukakuTrack, options?: ShoukakuPlayOptions): Promise<ShoukakuPlayer>;
    public stopTrack(): Promise<ShoukakuPlayer>;
    public setPaused(pause?: boolean): Promise<ShoukakuPlayer>;
    public seekTo(position: number): Promise<ShoukakuPlayer>;
    public setVolume(volume: number): Promise<ShoukakuPlayer>;
    public setEqualizer(bands: EqualizerBand[]): Promise<ShoukakuPlayer>;
    public setKaraoke(karaokeValue?: KaraokeValue): Promise<ShoukakuPlayer>;
    public setTimescale(timescalevalue?: TimescaleValue): Promise<ShoukakuPlayer>;
    public setTremolo(tremoloValue?: TremoloValue): Promise<ShoukakuPlayer>;
    public setVibrato(vibratoValue?: VibratoValue): Promise<ShoukakuPlayer>;
    public setRotation(rotationValue?: RotationValue): Promise<ShoukakuPlayer>;
    public setLowPass(lowPassValue?: LowPassValue): Promise<ShoukakuPlayer>;
    public setChannelMix(channelMixValue?: ChannelMixValue): Promise<ShoukakuPlayer>;
    public setGroupedFilters(settings?: ShoukakuGroupedFilterOptions): Promise<ShoukakuPlayer>;
    public clearFilters(): Promise<ShoukakuPlayer>;

    private connect(options: unknown, callback:(error: ShoukakuError | Error | null, player: ShoukakuPlayer) => void): void;
    private updateFilters(): Promise<void>;
    public resume(): Promise<void>;
    private reset(cleanBand: boolean): void;
  }

  export class ShoukakuLink {
    constructor(node: ShoukakuSocket, player: ShoukakuPlayer, guild: Guild);
    public node: ShoukakuSocket;
    public player: ShoukakuPlayer;
    public guildID: string;
    public shardID: number;
    public userID: string;
    public sessionID: string | null;
    public voiceChannelID: string | null;
    public selfMute: boolean;
    public selfDeaf: boolean;
    public state: ShoukakuStatus;

    private lastServerUpdate: unknown | null;
    private _callback: (err: ShoukakuError | Error | null, player: ShoukakuPlayer) => void | null;
    private _timeout: number | null;

    public attemptReconnect(): Promise<ShoukakuPlayer>;

    private stateUpdate(data: unknown);
    private serverUpdate(data: unknown);
    private connect(d: unknown, callback: (err: ShoukakuError | Error | null, player: ShoukakuPlayer) => void);
    private disconnect(): void;
    private move(): Promise<void>;
    private send(d: unknown): void;
  }

  export class ShoukakuSocket {
    constructor(shoukaku: Shoukaku, node: ShoukakuOptions);
    public shoukaku: Shoukaku;
    public players: Map<string, ShoukakuPlayer>;
    public rest: ShoukakuRest;
    public state: ShoukakuStatus;
    public stats: ShoukakuNodeStats;
    public reconnectAttempts: number;
    public name: string;
    public url: string;
    public penalties: number;

    private auth: string;
    private resumed: boolean;
    private cleaner: boolean;
    private packetRouter: unknown;
    private eventRouter: unknown;
    private resumable: boolean;
    private resumableTimeout: number;

    public connect(id: string, resumable: boolean | string): void;
    public joinVoiceChannel(options: ShoukakuJoinOptions): Promise<ShoukakuPlayer>;
    public leaveVoiceChannel(guildID: string): void;

    private send(data: unknown): Promise<boolean>;
    private configureResuming(): Promise<boolean>;
    private executeCleaner(): Promise<void>;
    private _upgrade(response: unknown): void;
    private _open(): void;
    private _message(message: string): void;
    private _error(error: Error): void;
    private _close(code: number, reason: string): void;
  }

  export interface Shoukaku {
    on(event: 'debug', listener: (name: string, data: unknown) => void): this;
    on(event: 'error', listener: (name: string, error: ShoukakuError | Error) => void): this;
    on(event: 'ready', listener: (name: string, reconnect: boolean) => void): this;
    on(event: 'close', listener: (name: string, code: number, reason: string | null) => void): this;
    on(event: 'disconnected', listener: (name: string, reason: string | null) => void): this;
    once(event: 'debug', listener: (name: string, data: unknown) => void): this;
    once(event: 'error', listener: (name: string, error: ShoukakuError | Error) => void): this;
    once(event: 'ready', listener: (name: string, reconnect: boolean) => void): this;
    once(event: 'close', listener: (name: string, code: number, reason: string | null) => void): this;
    once(event: 'disconnected', listener: (name: string, reason: string | null) => void): this;
    off(event: 'debug', listener: (name: string, data: unknown) => void): this;
    off(event: 'error', listener: (name: string, error: ShoukakuError | Error) => void): this;
    off(event: 'ready', listener: (name: string, reconnect: boolean) => void): this;
    off(event: 'close', listener: (name: string, code: number, reason: string | null) => void): this;
    off(event: 'disconnected', listener: (name: string, reason: string | null) => void): this;
  }

  export class Shoukaku extends EventEmitter {
    constructor(client: DiscordClient, nodes: ShoukakuNodeOptions[], options: ShoukakuOptions);
    public client: DiscordClient;
    public id: string | null;
    public nodes: Map<string, ShoukakuSocket>;

    public players: Map<string, ShoukakuPlayer>;
    public totalPlayers: number;

    private options: ShoukakuOptions;
    private rawRouter: unknown;

    public addNode(nodeOptions: ShoukakuNodeOptions): void;
    public removeNode(name: string, reason?: string): void;
    public getNode(name?: string | string[]): ShoukakuSocket;
    public getPlayer(guildId: string): ShoukakuPlayer | null;

    private _ready(name: string, resumed: boolean): void;
    private _close(name: string, code: number, reason: string): void;
    private _getIdeal(group: string): ShoukakuSocket;
  }
}
