export default function WeightedAverage() {
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
        if (!Number.isFinite(weight) || weight < 0) {
            throw new TypeError("'weight' must be a nonnegative number.");
        }

        if (!Number.isFinite(value)) {
            throw new TypeError("'value' must be a number.");
        }

        const state = weightedAverage.state;

        state.sumOfWeights            += weight;
        state.sumOfValuesTimesWeights += weight * value;

        state.currentWeightedAverage = (state.sumOfWeights != 0)
            ? state.sumOfValuesTimesWeights / state.sumOfWeights
            : 0;

        return weightedAverage.avg();
    };

    weightedAverage.avg = () => weightedAverage.state.currentWeightedAverage;

    weightedAverage.reset();

    return weightedAverage;
}
