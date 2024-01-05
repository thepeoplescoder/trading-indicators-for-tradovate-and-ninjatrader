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
    meta:   require("./tools/meta"),
});

class CumulativeDelta {
    init() {
        this.lastClose = 0;
    }

    map(d, index, history) {
        const doc = this.__getDeltaOpenClose(d);

        const prevd = (index > 0)
            ? history.prior() : d;

        const range = (Math.abs(doc.open) > Math.abs(doc.close))
            ? doc.open : doc.close;

        this.lastClose = doc.close;

        return this.__getResultAndCorrespondingVisual({
            prevd, d, result: { ...doc, value: range },
        });
    }

    __getDeltaOpenClose(d) {
        const delta = d.offerVolume() - d.bidVolume();
        const open  = this.lastClose;
        const close = open + delta;
        return { delta, open, close };
    }

    __getResultAndCorrespondingVisual({ prevd, d, result }) {
        const direction = this.__getDirection(prevd, d);

        const category = (() => {
            if      (direction.isUp)   { return "up";      }
            else if (direction.isDown) { return "down";    }
            else                       { return "neutral"; }
        })();

        ["open", "close"].forEach(e => {
            const KEY   = [category, '_', e].join('');
            result[KEY] = result[e];
        });

        if (direction.isUp || direction.isDown) {
            result.up = direction.isUp;
        }

        return result;
    }

    __getDirection(prevd, d) {
        const close = d.close();
        return this.props.strongUpDown ? {
            isUp:   close > prevd.high(),
            isDown: close < prevd.low(),
        } : {
            isUp:   close > d.open(),
            isDown: close < d.open(),
        };
    }
}

module.exports = {
    name:       "ThePeoplesCoder.CumulativeDelta",
    calculator: CumulativeDelta,

    description: "Cumulative Delta",

    params: {
        strongUpDown: tools.predef.paramSpecs.bool(true)
    },

    inputType:  tools.meta.InputType.BARS,
    areaChoice: tools.meta.AreaChoice.NEW,

    scaler:  tools.predef.scalers.multiPath(["open", "close"]),
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