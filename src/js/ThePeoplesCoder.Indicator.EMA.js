/**
 * ThePeoplesCoder.Indicator.EMA.js
 * 
 * The exponential moving average indicator, using Tradovate's predefined
 * "tool" for calculating the EMA.  Written for learning purposes.
 * 
 * @author thepeoplescoder
 */

// Import necessary tools from the tools module
const { predef, EMA: emaTools } = require("./tools");

// Define a class for Exponential Moving Average calculation
class ExponentialMovingAverage {
    constructor(props) {
        // Initialize necessary properties
        this.period = props.period;
        // Initialize the EMA calculation tool with the specified period
        this.ema = emaTools.EMA(this.period);
    }

    // Method to calculate the EMA for a given value
    calculateEMA(value) {
        return this.ema(value);
    }

    // Map function to calculate EMA on the provided data
    map(data) {
        return this.calculateEMA(data.value());
    }

    // Filter function to determine if enough values are available for EMA calculation
    filter(_, index) {
        return index >= this.period; // Keep values if enough for EMA calculation
    }
}

// Export module with EMA details, parameters, and styles
module.exports = {
    name: "ThePeoplesCoder.Indicator.ExponentialMovingAverage",
    calculator: ExponentialMovingAverage,
    params: {
        period: predef.paramSpecs.period(14)
    },
    schemeStyles: predef.styles.solidLine("#95f57a")
};