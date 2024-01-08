/**
 * ThePeoplesCoder.Indicator.VWAP.js
 * 
 * Volume Weighted Average Price
 * 
 * @author thepeoplescoder
 */

function requireFromUrl(url) {
    return requireFromSourceCode(getTextFromUrl(url));

    function requireFromSourceCode(sourceCode) {
        const module = {exports: {}};
        (new Function("module", "exports", sourceCode))(module, module.exports);
        return module.exports;
    }
    function getTextFromUrl(url) {
        console.log("Loading text from URL: " + url);
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send();
        return request.responseText;
    }
}

const tools = Object.freeze({
    predef: require("./tools/predef"),
});

const REPOSITORY  = "https://raw.githubusercontent.com/thepeoplescoder/trading-indicators-for-tradovate-and-ninjatrader";
const BRANCH_ROOT = REPOSITORY + "/main";

const WeightedAverage = requireFromUrl(BRANCH_ROOT + "/src/js/ThePeoplesCoder.Tool.WeightedAverage.js");

class VWAP {
    init() {
        this.weightedAverage = WeightedAverage();
    }
    map(d, index) {
        return this.weightedAverage({ weight: d.volume(), value: d.value() });
    }
}

module.exports = {
    name: "ThePeoplesCoder.VWAP",
    calculator: VWAP,
    description: "Volume Weighted Average Price",
    tags: ["com.thepeoplescoder",],
    schemeStyles: tools.predef.styles.solidLine("#95f57a")
};