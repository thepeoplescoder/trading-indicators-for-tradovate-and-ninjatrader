/**
 * ThePeoplesCoder.Indicator.CumulativeDelta.js
 * 
 * A refactoring of Tradovate/NinjaTrader's Cumulative Delta indicator.
 * Refactored using a self-documenting, semi-functional approach.
 * 
 * Written for learning purposes, and to resolve the issue of the original
 * cumulative delta indicator not showing up in my trading environment.
 * 
 * @author thepeoplescoder
 */

const tools = Object.freeze({
    predef: require("./tools/predef"),
    meta: require("./tools/meta"),
});

class CumulativeDelta {
    // initialize lastClose to 0
    constructor() {
        this.lastClose = 0;
    }

    //Reset lastClose to 0
    initialize() {
        this.lastClose = 0;
    }

    // Calculate the cumulative delta, open, and close values
    map(d, index, history) {
        const deltaOpenClose = this.__getDeltaOpenClose(d);
        const prevd = (index > 0) ? history.prior() : d;
        const range = Math.abs(deltaOpenClose.open) > Math.abs(deltaOpenClose.close) ? deltaOpenClose.open : deltaOpenClose.close;

        // Update lastClose with the close value
        this.lastClose = deltaOpenClose.close;

        // Return the result and corresponding visual
        return this.__getResultAndCorrespondingVisual({
            prevd,
            d,
            result: { ...deltaOpenClose, value: range },
        });
    }

    // Calculate delta, open, and close values based on input data
    __getDeltaOpenClose(d) {
        const delta = d.offerVolume() - d.bidVolume();
        const open = this.lastClose;
        const close = open + delta;
        return { delta, open, close };
    }

    // Determine direction (up, down, or neutral)
    __getResultAndCorrespondingVisual({ prevd, d, result }) {
        const direction = this.__getDirection(prevd, d);

        const category = direction.isUp ? "up" : direction.isDown ? "down" : "neutral";

        // Rename open and close keys based on direction
        ["open", "close"].forEach(e => {
            const KEY = [category, '_', e].join('');
            result[KEY] = result[e];
        });

        // Set 'up' flag if direction is up or down
        if (direction.isUp || direction.isDown) {
            result.up = direction.isUp;
        }

        return result;
    }

    // Determine direction based on close values
    __getDirection(prevd, d) {
        const close = d.close();
        return this.props.strongUpDown ? {
            isUp: close > prevd.high(),
            isDown: close < prevd.low(),
        } : {
            isUp: close > d.open(),
            isDown: close < d.open(),
        };
    }
}

module.exports = {
    name: "ThePeoplesCoder.CumulativeDelta",
    calculator: CumulativeDelta,

    description: "Cumulative Delta",

    params: {
        strongUpDown: tools.predef.paramSpecs.bool(true)
    },

    inputType: tools.meta.InputType.BARS,
    areaChoice: tools.meta.AreaChoice.NEW,

    scaler: tools.predef.scalers.multiPath(["open", "close"]),
    plotter: tools.predef.plotters.cumulative,

    plots: {
        delta: "Delta"
    },

    schemeStyles: tools.predef.styles.solidLine("delta", {
        color: "#7e838c",
        lineWidth: 3
    }),

    tags: ["com.thepeoplescoder",],
};