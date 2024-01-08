/**
 * ThePeoplesCoder.Indicator.VWAP.js
 * 
 * Volume Weighted Average Price
 * 
 * @author thepeoplescoder
 */

function loadModuleFromUrl(url) {
    return loadModuleFromSourceCode(getTextFromUrl());

    function loadModuleFromSourceCode(sourceCode) {
        const module = {exports: {}};
        (new Function("module", "exports", sourceCode))(module, module.exports);
        return module.exports;
    }

    function getTextFromUrl() {
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

const WeightedAverage = loadModuleFromUrl(BRANCH_ROOT + "/src/js/ThePeoplesCoder.Tool.WeightedAverage.js");

class VWAP {
    init() {
        this.weightedAverage = WeightedAverage();
    }
    map(d) {
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