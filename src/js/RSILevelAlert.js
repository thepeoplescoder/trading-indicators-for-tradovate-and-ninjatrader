class RSILevelAlert {
    constructor() {
        this.RSI = tools.RSI(this.props.period);
    }
    
    map(d, index) {
        const rsi = this.RSI(d.value());

        if (rsi > this.props.overboughtLevel) {
            this.generateAlert('OVERBOUGHT', d.timestamp());
        } else if (rsi < this.props.oversoldLevel) {
            this.generateAlert('OVERSOLD', d.timestamp());
        }

        return rsi;
    }

    generateAlert(type, timestamp) {
        // Logic to send alerts for RSI levels
        const message = `RSI Signal: ${type} at ${timestamp}`;
        // Send message to user
    }
}

module.exports = {
    name: "ThePeoplesCoder.RSILevelAlert",
    calculator: RSILevelAlert,
    params: {
        period: predef.paramSpecs.period(14),
        overboughtLevel: 70,
        oversoldLevel: 30
    },
};