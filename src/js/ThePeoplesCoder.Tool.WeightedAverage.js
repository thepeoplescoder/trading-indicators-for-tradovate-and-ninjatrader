function WeightedAverage() {
    function weightedAverage({ weight, value }) {
        return weightedAverage.push({ weight, value });
    }

    weightedAverage.reset = () => {
        weightedAverage.state = {
            sumOfWeights: 0,
            sumOfValuesTimesWeights: 0,
            currentWeightedAverage: 0,
        };
    };

    weightedAverage.push = ({ weight, value }) => {
        if (!Number.isFinite(weight)) {
            throw new TypeError("'weight' must be a number.");
        }

        if (!Number.isFinite(value)) {
            throw new TypeError("'value' must be a number.");
        }

        const state = weightedAverage.state;

        state.sumOfWeights            += weight;
        state.sumOfValuesTimesWeights += weight * value;

        return weightedAverage.avg();
    };

    weightedAverage.avg = () => {
        const state = weightedAverage.state;
        return (state.sumOfWeights != 0)
            ? state.sumOfValuesTimesWeights / state.sumOfWeights
            : 0;
    };

    weightedAverage.reset();

    return weightedAverage;
}

module.exports = WeightedAverage;
