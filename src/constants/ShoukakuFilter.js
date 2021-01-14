/**
 * Filters available for customization. See https://github.com/Frederikam/Lavalink/blob/dev/IMPLEMENTATION.md#using-filters
 * @class ShoukakuFilter
 */
class ShoukakuFilter {
    /**
     * @param {Object} [settings] settings to intialize this filter with
     * @param {Number} [settings.volume=1.0] volume of this filter
     * @param {Array<ShoukakuConstants#EqualizerBand>} [settings.equalizer=[]] equalizer of this filter
     * @param {ShoukakuConstants#KaraokeValue} [settings.karaoke] karaoke settings of this filter
     * @param {ShoukakuConstants#TimescaleValue} [settings.timescale] timescale settings of this filter
     * @param {ShoukakuConstants#TremoloValue} [settings.tremolo] tremolo settings of this filter
     * @param {ShoukakuConstants#VibratoValue} [settings.vibrato] vibrato settings of this filter
     * @param {ShoukakuConstants#RotationValue} [settings.rotation] rotation settings of this filter
     * @param {ShoukakuConstants#LowPassValue} [settings.lowPass] lowPass settings of this filter
     * @param {ShoukakuConstants#ChannelMixValue} [settings.channelMix] channelMix settings of this filter
     */
    constructor(settings = {}) {
        const { volume, equalizer, karaoke, timescale, tremolo, vibrato, rotation, lowPass, channelMix } = settings;
        /**
         * The volume of this filter
         * @type {Number}
         */
        this.volume = volume || 1.0;
        /**
         * The equalizer bands set for this filter
         * @type {Array<ShoukakuConstants#EqualizerBand>}
         */
        this.equalizer = equalizer || [];
        /**
         * The karaoke settings set for this filter
         * @type {?ShoukakuConstants#KaraokeValue}
         */
        this.karaoke = karaoke || null;
        /**
         * The timescale settings set for this filter
         * @type {?ShoukakuConstants#TimescaleValue}
         */
        this.timescale = timescale || null;
        /**
         * The tremolo settings set for this filter
         * @type {?ShoukakuConstants#TremoloValue}
         */
        this.tremolo = tremolo || null;
        /**
         * The vibrato settings set for this filter
         * @type {?ShoukakuConstants#VibratoValue}
         */
        this.vibrato = vibrato || null;
        /**
         * The rotation settings set for this filter
         * @type {?ShoukakuConstants#RotationValue}
         */
        this.rotation = rotation || null;
        /**
         * The lowPass settings set for this filter
         * @type {?ShoukakuConstants#LowPassValue}
         */
        this.lowPass = lowPass || null;
        /**
         * The channelMix settings set for this filter
         * @type {?ShoukakuConstants#ChannelMixValue}
         */
        this.channelMix = channelMix || null;

    }
}

module.exports = ShoukakuFilter;