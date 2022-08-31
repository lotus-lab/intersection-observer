"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInViewTrigger = void 0;
var react_1 = require("react");
var helper_1 = require("./helper");
var useInViewTrigger = function (options) {
    var _a = (0, react_1.useState)({
        inView: false,
        visibilityTime: 0,
    }), inViewData = _a[0], setInViewData = _a[1];
    var observerOptions = __assign({ root: window.document, threshold: 0.5, rootMargin: '0px' }, options);
    var inViewStateForObserveOnce = (0, react_1.useRef)(false);
    var root = (0, helper_1.checkRootObject)(observerOptions);
    var targetRef = (0, react_1.useRef)(null);
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var _a;
            if (entry.isIntersecting) {
                (_a = observerOptions === null || observerOptions === void 0 ? void 0 : observerOptions.callback) === null || _a === void 0 ? void 0 : _a.call(observerOptions);
                inViewStateForObserveOnce.current = true;
                return setInViewData({
                    inView: true,
                    visibilityTime: (0, helper_1.visibilityTimer)(entry.target),
                    entry: entry
                });
            }
            if (observerOptions.observeOnce && inViewStateForObserveOnce.current) {
                return observer.disconnect();
            }
            return setInViewData({
                inView: false,
            });
        });
    }, __assign(__assign({}, observerOptions), { root: root }));
    var handleObserver = (0, react_1.useCallback)(function () {
        if (targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) {
            observer.observe(targetRef === null || targetRef === void 0 ? void 0 : targetRef.current);
        }
    }, []);
    (0, react_1.useEffect)(function () {
        handleObserver();
    }, [handleObserver]);
    return __assign({ targetRef: targetRef }, inViewData);
};
exports.useInViewTrigger = useInViewTrigger;
