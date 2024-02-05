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
        const module = {loadModuleFromUrl, loadModuleFromSourceCode, getTextFromUrl, url, exports: {}};
        (new Function("module", "exports", sourceCode))(module, module.exports);
        return module.exports;
    }
    function getTextFromUrl(url) {
        const request = new XMLHttpRequest();   // XHR must be used to load remote code in TV/NT
        request.open("GET", url, false);
        console.log("Loading text from URL: " + url);
        request.send();
        return request.responseText;
    }
    return loadModuleFromUrl(URL);
})();
