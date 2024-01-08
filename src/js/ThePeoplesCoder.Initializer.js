const { loadModuleFromSourceCode, getTextFromUrl, loadModuleFromUrl } = module;

const REPOSITORY  = "https://raw.githubusercontent.com/thepeoplescoder/trading-indicators-for-tradovate-and-ninjatrader";
const BRANCH_ROOT = REPOSITORY + "/main";

function loadLocalTool(toolName) {
    return loadModuleFromUrl([BRANCH_ROOT, "/src/js/ThePeoplesCoder.Tool.", toolName, ".js"].join(''));
}

module.exports = {
    loadModuleFromSourceCode,
    getTextFromUrl,
    loadModuleFromUrl,
    loadLocalTool,
};
