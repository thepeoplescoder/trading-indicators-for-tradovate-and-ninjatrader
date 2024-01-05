// Hey ThePeoplesCoder, hope you don't mind me building on your project! I'm going to add skeleton code for functionality that allows
// you to generate buy/sell signals based on specific conditions. This one will be for crossing moving averages.

class MovingAverageCrossOver {
    constructor(){
        this.shortMA = tools.EMA(this.props.shortPeriod);
        this.longMA = tools.EMA(this.props.longPeriod);
    }

    map(d, index) {
        const shortEMA = this.shortMA(d.value());
        const longEMA = this.longMA(d.value());

        if (shortEMA > longEMA && this.prevShortEMA <= this.prevLongEMA) {
            // Generate buy signal alert
            this.generateAlert('BUY', d.timestamp());
        } else if (shortEMA < longEMA && this.prevShortEMA >= this.prevLongEMA) {
            // Generate sell signal alert
            this.generateAlert('SELL', d.timestamp());
        }

        this.prevShortEMA = shortEMA;
        this.prevLongEMA = longEMA;

        return { shortEMA, longEMA };
    }

    generateAlert(type, timestamp) {
        // Logic to send alerts (email, SMS, etc.)
        // Example: Send an email or push notification to notify the user
        const message = `Signal: ${type} at ${timestamp}`;
        // Send message to user
    }
}

module.exports = {
    name: "ThePeoplesCoder.MovingAverageCrossOver",
    calculator: MovingAverageCrossOver,
    params: {
        shortPeriod: predef.paramSpecs.period(9),
        longPeriod: predef.paramSpecs.period(21)
    },
};