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

const WeightedAverage = loadCommonJsModuleFromUrl([
    "https://raw.githubusercontent.com/thepeoplescoder",
    "/trading-indicators-for-tradovate-and-ninjatrader",
    "/main",
    "/src/js/ThePeoplesCoder.Tool.WeightedAverage.js",
].join(''));


function loadCommonJsModuleFromUrl(url) {
    return loadCommonJsModuleFromSourceCode(loadSourceCodeFromUrl(url));
}

function loadSourceCodeFromUrl(url) {
    console.log("Syncrhonously loading source code from URL: " + url);
    return theOldWay();

    function theOldWay() {
        console.log("Doing it the old way.");

        const request = new XMLHttpRequest();
        const result  = {};
        
        request.addEventListener("load",
            () => (result.sourceCode = request.responseText));
            
        request.open("GET", url, false);
        request.send();
        
        return result.sourceCode;
    }

    function theNewWay() {
        const result = {};
        (async () => {
            console.log("Doing it the new way.");
            const response    = await fetch(url);
            result.sourceCode = await response.text();
        })();
        console.log("WHY DOES THIS NOT WORK??????");
        console.log(JSON.stringify(result));
        return result.sourceCode;
    }
}

function loadCommonJsModuleFromSourceCode(src) {
    console.log("Source code loaded:\n" + src);

    const module = {exports: {}};
    (new Function("module", "exports", src))(module, module.exports);
    return module.exports;
}

class VWAP {
    init() {
        this.weightedAverage = WeightedAverage();
    }

    map(d, index) {
        const weight = d.volume();
        const value  = d.value();

        return this.weightedAverage({ weight, value });
    }
}

module.exports = {
    name: "ThePeoplesCoder.VWAP",
    calculator: VWAP,
    description: "Volume Weighted Average Price",
    tags: ["com.thepeoplescoder",],
    schemeStyles: tools.predef.styles.solidLine("#95f57a")
};