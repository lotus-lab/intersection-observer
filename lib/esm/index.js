import { useState, useRef, useCallback, useEffect } from 'react';

var checkRootObject = function (options) {
    var _a;
    if (!((options === null || options === void 0 ? void 0 : options.root) instanceof Document)) {
        return (_a = options === null || options === void 0 ? void 0 : options.root) === null || _a === void 0 ? void 0 : _a.current;
    }
    return options === null || options === void 0 ? void 0 : options.root;
};
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

var __assign = (window && window.__assign) || function () {
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
var useInViewTrigger = function (options) {
    var _a = useState({
        inView: false,
        visibilityTime: 0,
    }), inViewData = _a[0], setInViewData = _a[1];
    var observerOptions = __assign({ root: window.document, threshold: 0.5, rootMargin: '0px' }, options);
    var inViewStateForObserveOnce = useRef(false);
    var root = checkRootObject(observerOptions);
    var targetRef = useRef(null);
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            var _a;
            if (entry.isIntersecting) {
                (_a = observerOptions === null || observerOptions === void 0 ? void 0 : observerOptions.callback) === null || _a === void 0 ? void 0 : _a.call(observerOptions);
                inViewStateForObserveOnce.current = true;
                return setInViewData({
                    inView: true,
                    visibilityTime: visibilityTimer(entry.target),
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
    var handleObserver = useCallback(function () {
        if (targetRef === null || targetRef === void 0 ? void 0 : targetRef.current) {
            observer.observe(targetRef === null || targetRef === void 0 ? void 0 : targetRef.current);
        }
    }, []);
    useEffect(function () {
        handleObserver();
    }, [handleObserver]);
    return __assign({ targetRef: targetRef }, inViewData);
};

export { useInViewTrigger };
