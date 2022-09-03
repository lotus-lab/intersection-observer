import { MutableRefObject, RefObject } from 'react';
export interface OptionsType {
    callback?: (data: InViewDataTypes) => void;
    rootMargin?: string;
    threshold?: number;
    root?: RefObject<any> | Document;
    observeOnce?: boolean;
    getLastVisibleData?: boolean;
}
export interface InViewDataTypes {
    visibilityTime?: number;
    inView: boolean;
    entry?: IntersectionObserverEntry | null;
}
export interface IntersectionCallback {
    entries: IntersectionObserverEntry[];
    inViewStateForObserveOnce: MutableRefObject<boolean>;
    observerOptions: OptionsType;
    setInViewData: (data: InViewDataTypes) => void;
    inViewData: InViewDataTypes;
    observer: IntersectionObserver;
    targetRef: MutableRefObject<any>;
}
