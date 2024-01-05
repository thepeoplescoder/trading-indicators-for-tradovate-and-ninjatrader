/**
 * ThePeoplesCoder.Indicator.EMAFromScratch.js
 * 
 * The exponential moving average indicator, written from scratch
 * for the purpose of learning how to write custom indicators.
 * 
 * @author thepeoplescoder
 */

const predef = require("./tools/predef");

class EMAFromScratch {
    init() {
        this.previousMA = undefined;
        this.initialSum = 0;
        this.MULTIPLIER = 2.0 / (this.props.period + 1);
    }
    
    map(d, index) {
        this.previousMA = this.__weHaveEnoughValuesForAnEma(index)
            ? this.__calculateEma(d)
            : this.__updateInitialSumAndGetAverage(d, index);

        return this.previousMA;
    }

    filter(_, index) {
        return this.__weHaveEnoughValuesForAnEma(index);
    }

    __weHaveEnoughValuesForAnEma(index) {
        return index >= this.props.period;
    }

    __calculateEma(d) {
        return this.previousMA + this.MULTIPLIER * (d.value() - this.previousMA);
    }
    
    __updateInitialSumAndGetAverage(d, index) {
        this.initialSum += d.value();
        return this.initialSum / (index + 1);
    }
}

module.exports = {
    name: "ThePeoplesCoder.EMAFromScratch",
    calculator: EMAFromScratch,
    params: {
        period: predef.paramSpecs.period(14)
    },
    schemeStyles: predef.styles.solidLine("#95f57a")
};
