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
import { useCallback, useEffect, useRef, useState } from 'react';
import { checkRootObject, intersectionCallback } from './helper';
export var useInViewTrigger = function (options) {
    var _a = useState({
        inView: false,
        visibilityTime: 0,
        entry: null,
    }), inViewData = _a[0], setInViewData = _a[1];
    var observerOptions = __assign({ root: window.document, threshold: 0.5, rootMargin: '0px' }, options);
    var inViewStateForObserveOnce = useRef(false);
    var root = checkRootObject(observerOptions);
    var targetRef = useRef(null);
    var observer = new IntersectionObserver(function (entries) {
        intersectionCallback({
            entries: entries,
            inViewStateForObserveOnce: inViewStateForObserveOnce,
            observer: observer,
            observerOptions: observerOptions,
            setInViewData: setInViewData,
            targetRef: targetRef,
            inViewData: inViewData,
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
