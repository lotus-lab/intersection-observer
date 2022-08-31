"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.visibilityTimer = exports.checkRootObject = void 0;
var checkRootObject = function (options) {
    var _a;
    if (!((options === null || options === void 0 ? void 0 : options.root) instanceof Document)) {
        return (_a = options === null || options === void 0 ? void 0 : options.root) === null || _a === void 0 ? void 0 : _a.current;
    }
    return options === null || options === void 0 ? void 0 : options.root;
};
exports.checkRootObject = checkRootObject;
var allTimes = [];
function visibilityTimer(adBox) {
    var lastStarted = adBox.dataset.lastViewStarted;
    var currentTime = performance.now();
    var totalViewTime = 0;
    if (lastStarted) {
        var diff = currentTime - parseFloat(lastStarted);
        totalViewTime += diff;
    }
    adBox.dataset.lastViewStarted = currentTime.toString();
    allTimes.push(Math.round(totalViewTime));
    return allTimes.reduce(function (curr, prev) {
        prev += curr;
        return prev;
    }, 0);
}
exports.visibilityTimer = visibilityTimer;
