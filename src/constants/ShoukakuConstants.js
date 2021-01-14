const { name, version, repository } = require('../../package.json');
/**
 * Constants for Shoukaku.
 * @class ShoukakuConstants
 */
class ShoukakuConstants {
    /**
    * Available Status for Node / Link managers.
    * @typedef {string} ShoukakuStatus
    * @enum {ShoukakuStatus}
    * @memberof ShoukakuConstants#
    */
    static get ShoukakuStatus() {
        return {
            CONNECTING: 'CONNECTING',
            CONNECTED: 'CONNECTED',
            DISCONNECTING: 'DISCONNECTING',
            DISCONNECTED: 'DISCONNECTED'
        };
    }
    /**
    * Shoukaku's Node Stats Object.
    * @typedef {Object} ShoukakuNodeStats
    * @memberof ShoukakuConstants#
    */
    static get ShoukakuNodeStats() {
        return {
            playingPlayers: 0,
            op: 'stats',
            memory: {
                reservable: 0,
                used: 0,
                free: 0,
                allocated: 0
            },
            frameStats: {
                sent: 0,
                deficit: 0,
                nulled: 0
            },
            players: 0,
            cpu: {
                cores: 0,
                systemLoad: 0,
                lavalinkLoad: 0
            },
            uptime: 0
        };
    }
    /**
    * Required Object in Shoukaku's join method.
    * @typedef {Object} ShoukakuJoinOptions
    * @property {string} guildID Guild ID of the Voice Channel you want to join to.
    * @property {string} voiceChannelID Voice Channel ID of the Voice Channel you want to join to.
    * @property {boolean} [mute=false] Whether to mute the client.
    * @property {boolean} [deaf=false] Whether to deafen the client.
    * @memberof ShoukakuConstants#
    */
    static get ShoukakuJoinOptions() {
        return {
            guildID: null,
            voiceChannelID: null,
            mute: false,
            deaf: false
        };
    }
    /**
    * Required Object in Shoukaku's join method.
    * @typedef {Object} ShoukakuPlayOptions
    * @property {boolean} [noReplace=true] Specifies if the player will not replace the current track when executing this action.
    * @property {?number} [startTime] In milliseconds on when to start.
    * @property {?number} [endTime] In milliseconds on when to end.
    * @memberof ShoukakuConstants#
    */
    static get ShoukakuPlayOptions() {
        return {
            noReplace: true,
            startTime: undefined,
            endTime: undefined
        };
    }
    /**
    * Options that Shoukaku accepts upon initialization.
    * @typedef {Object} ShoukakuOptions
    * @property {boolean|string} [resumable=false] If you want your node to support resuming. Just replace the false with the resume-key you want to enable resuming.
    * @property {number} [resumableTimeout=30] Timeout when Lavalink will decide a player isn't resumed and will destroy the connection to it.
    * @property {number} [reconnectTries=2] Amount of tries to connect to the lavalink Node before it decides that the node is unreconnectable.
    * @property {boolean} [moveOnDisconnect=false] Specifies if the library will attempt to reconnect players on a disconnected node to another node.
    * @property {number} [restTimeout=15000] Timeout on rest requests to your lavalink node.
    * @property {string} [userAgent="{name}/{version} (+{url})"] User-Agent to use on connecting to WS and REST requests
    * @memberof ShoukakuConstants#
    */
    static get ShoukakuOptions() {
        return {
            resumable: false,
            resumableTimeout: 30,
            reconnectTries: 2,
            moveOnDisconnect: false,
            restTimeout: 15000,
            userAgent: `${name}/${version} (${repository.url})`
        };
    }
    /**
    * Options that Shoukaku needs to initialize a lavalink node.
    * @typedef {Object} ShoukakuNodeOptions
    * @property {string} name Your Node Name, anything you want to name your node.
    * @property {string} host Your node host / ip address of where the lavalink is hosted.
    * @property {number} port The Port Number of your lavalink instance.
    * @property {string} auth The authentication key you set on your lavalink config.
    * @property {?string} [group] Group of this node, used for grouping specific nodes.
    * @memberof ShoukakuConstants#
    */
    static get ShoukakuNodeOptions() {
        return {
            name: null,
            host: null,
            port: null,
            auth: null,
            group: undefined
        };
    }
    /**
     * An array of ShoukakuNodeOptions
     * @typedef {Array<ShoukakuNodeOptions>} ShoukakuNodes
     * @memberof ShoukakuConstants#
     */
    static get ShoukakuNodes() {
        return [].push(ShoukakuConstants.ShoukakuNodeOptions);
    }
    /**
     * Available settings for an Equalizer Band
     * @typedef {EqualizerBand} EqualizerBand
     * @property {number} band Equalizer Band Level
     * @property {number} gain Equalizer Gain Level
     * @memberof ShoukakuConstants#
     */
    static get EqualizerBand() {
        return {
            band: 0,
            gain: 0
        };
    }
    /**
     * Available settings for Karaoke
     * @typedef {KaraokeValue} KaraokeValue
     * @property {?number} [level] Karaoke level
     * @property {?number} [monoLevel] Karaoke MonoLevel
     * @property {?number} [filterBand] Karaoke FilterBand
     * @property {?number} [filterWidth] Karaoke FilterWidth
     * @memberof ShoukakuConstants#
     */
    static get KaraokeValue() {
        return {
            level: 1.0,
            monoLevel: 1.0,
            filterBand: 220.0,
            filterWidth: 100.0
        };
    }
    /**
     * Available settings for rotation
     * @typedef {RotationValue} RotationValue
     * @property {?number} [speed] Rotation Speed level
     * @memberof ShoukakuConstants#
     */
    static get RotationValue() {
        return {
            speed: 0
        };
    }
    /**
     * Available settings for lowPass
     * @typedef {LowPassValue} LowPassValue
     * @property {?number} [smoothing] Rotation Speed level
     * @memberof ShoukakuConstants#
     */
    static get LowPassValue() {
        return {
            smoothing: 0
        };
    }
    /**
     * Available settings for lowPass
     * @typedef {ChannelMixValue} ChannelMixValue
     * @property {?number} [leftToRight] left to right speed
     * @property {?number} [rightToRight] right to right speed
     * @property {?number} [rightToLeft] right to left speed
     * @property {?number} [leftToLeft] left to left speed
     * @memberof ShoukakuConstants#
     */
    static get ChannelMixValue() {
        return {
            leftToRight: 0,
            rightToRight: 0,
            rightToLeft: 0,
            leftToLeft: 0
        }
    }
    /**
     * Available settings for Timescale
     * @typedef {TimescaleValue} TimescaleValue
     * @property {?number} [speed] Timescale Speed
     * @property {?number} [pitch] Timescale Pitch
     * @property {?number} [rate] Timescale Rate
     * @memberof ShoukakuConstants#
     */
    static get TimescaleValue() {
        return {
            speed: 1.0,
            pitch: 1.0,
            rate: 1.0
        };
    }
    /**
     * Available settings for Tremolo
     * @typedef {TremoloValue} TremoloValue
     * @property {?number} [frequency] Tremolo Frequency
     * @property {?number} [depth] Tremolo Depth
     * @memberof ShoukakuConstants#
     */
    static get TremoloValue() {
        return {
            frequency: 2.0,
            depth: 0.5
        };
    }
    /**
     * Available settings for Vibrato
     * @typedef {VibratoValue} VibratoValue
     * @property {?number} [frequency] Vibrato Frequency
     * @property {?number} [depth] Vibrato Depth
     * @memberof ShoukakuConstants#
     */
    static get VibratoValue() {
        return {
            frequency: 2.0, 
            depth: 0.5
        };
    }
}
module.exports = ShoukakuConstants;
