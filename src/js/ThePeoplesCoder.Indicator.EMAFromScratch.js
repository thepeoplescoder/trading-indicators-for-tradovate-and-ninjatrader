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
    constructor() {
        // Initialize variables for EMA calculation
        this.previousMA = undefined;
        this.initialSum = 0;
        this.MULTIPLIER = 2.0 / (this.props.period + 1);
    }
    
    // Mapping function to calculate EMA for each data point
    map(d, index) {
        this.previousMA = this.hasEnoughValuesForEMA(index)
            ? this.calculateEMA(d)
            : this.updateInitialSumAndGetAverage(d, index);

        return this.previousMA;
    }

    // Filter function to determine if there are enough values for EMA calculation
    filter(_, index) {
        return this.hasEnoughValuesForEMA(index);
    }

    // Check if there are enough values to compute EMA
    hasEnoughValuesForEMA(index) {
        return index >= this.props.period;
    }

    // Calculate EMA for the given data point
    calculateEMA(d) {
        return this.previousMA + this.MULTIPLIER * (d.value() - this.previousMA);
    }
    
    // Update initial sum and calculate the average for the first few values
    updateInitialSumAndGetAverage(d, index) {
        this.initialSum += d.value();
        return this.initialSum / (index + 1);
    }
}

module.exports = {
    name: "ThePeoplesCoder.EMAFromScratch",
    calculator: EMAFromScratch,
    params: {
        period: predef.paramSpecs.period(14) // Default period for EMA calculation
    },
    schemeStyles: predef.styles.solidLine("#95f57a") // Scheme styles for plotting
};