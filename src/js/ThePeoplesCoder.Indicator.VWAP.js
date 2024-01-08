/**
 * ThePeoplesCoder.Indicator.VWAP.js
 * 
 * Volume Weighted Average Price
 * 
 * @author thepeoplescoder
 */

const tools = Object.freeze({
    predef: require("./tools/predef"),
});

// bootstrapping code to use my libraries.
// this must be copied and pasted into your indicator to use.
const initializer = (() => {
    const URL = "https://raw.githubusercontent.com/thepeoplescoder/trading-indicators-for-tradovate-and-ninjatrader/main/src/js/ThePeoplesCoder.Initializer.js";
    const MODULES = {};
    function loadModuleFromUrl(url) {
        if (!(url in MODULES)) {
            MODULES[url] = loadModuleFromSourceCode(getTextFromUrl(url), url);
        }
        return MODULES[url];
    }
    function loadModuleFromSourceCode(sourceCode, url) {
        const module  = {loadModuleFromSourceCode, getTextFromUrl, loadModuleFromUrl, url, exports: {}};
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
    return loadModuleFromUrl(URL);
})();

const WeightedAverage = initializer.loadGitHubTool("WeightedAverage");

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