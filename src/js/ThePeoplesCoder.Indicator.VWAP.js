/**
 * ThePeoplesCoder.Indicator.VWAP.js
 * 
 * Volume Weighted Average Price
 * 
 * @author thepeoplescoder
 */

const tools = Object.freeze({
    predef: require("./tools/predef"),
});

const WeightedAverage = require("./ThePeoplesCoder.Tool.WeightedAverage.js");

class VWAP {
    init() {
        this.weightedAverage = WeightedAverage();
    }

    map(d, index) {
        const weight = d.volume();
        const value  = d.value();

        return this.weightedAverage({ weight, value });
    }
}

module.exports = {
    name: "ThePeoplesCoder.VWAP",
    calculator: VWAP,

    description: "Volume Weighted Average Price",
    tags: ["com.thepeoplescoder",],

    schemeStyles: tools.predef.styles.solidLine("#95f57a")
};
