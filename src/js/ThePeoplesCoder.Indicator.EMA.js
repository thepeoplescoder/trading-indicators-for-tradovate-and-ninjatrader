/**
 * ThePeoplesCoder.Indicator.EMA.js
 * 
 * The exponential moving average indicator, using Tradovate's predefined
 * "tool" for calculating the EMA.  Written for learning purposes.
 * 
 * @author thepeoplescoder
 */

const tools = Object.freeze({
    predef: require("./tools/predef"),
    EMA:    require("./tools/EMA"),
});

class EMA {
    init() {
        this.ema = tools.EMA(this.props.period);
    }
    
    map(d, index) {
        return this.ema(d.value());
    }

    filter(_, index) {
        return index >= this.props.period;      // keep value if we have enough values for an EMA calculation
    }
}

module.exports = {
    name: "ThePeoplesCoder.EMA",
    calculator: EMA,

    description: "Exponential Moving Average",
    tags: ["com.thepeoplescoder",],

    params: {
        period: tools.predef.paramSpecs.period(14)
    },
    schemeStyles: tools.predef.styles.solidLine("#95f57a")
};
