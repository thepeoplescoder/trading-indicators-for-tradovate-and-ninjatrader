class RSILevelAlert {
    constructor() {
        // Initialize the Relative Strength Index (RSI) calculator with the specified period
        this.RSI = tools.RSI(this.props.period);
    }
    
    map(d, index) {
        // Calculate the RSI value for the current data point
        const rsi = this.RSI(d.value());

        // Check if the RSI value crosses the specified overbought and oversold levels
        if (rsi > this.props.overboughtLevel) {
            // Generate an overbought alert if RSI crosses the overbought level
            this.generateAlert('OVERBOUGHT', d.timestamp());
        } else if (rsi < this.props.oversoldLevel) {
            // Generate an oversold alert if RSI crosses the oversold level
            this.generateAlert('OVERSOLD', d.timestamp());
        }

        // Return the calculated RSI value
        return rsi;
    }

    generateAlert(type, timestamp) {
        // Logic to send alerts for RSI levels
        // Create a message indicating the RSI signal type and timestamp
        const message = `RSI Signal: ${type} at ${timestamp}`;
        // Send the message to notify the user (could be via email, SMS, etc.)
        // Example: sendAlert(message);
    }
}

module.exports = {
    name: "ThePeoplesCoder.RSILevelAlert",
    calculator: RSILevelAlert,
    params: {
        // Set the default RSI period and overbought/oversold levels
        period: predef.paramSpecs.period(14),
        overboughtLevel: 70,
        oversoldLevel: 30
    },
};