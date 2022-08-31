import { RefObject } from 'react';
export interface OptionsType {
    callback?: () => void;
    rootMargin?: string;
    threshold?: number;
    root?: RefObject<any> | Document;
    observeOnce?: boolean;
}
export interface InViewDataTypes {
    visibilityTime?: number;
    inView: boolean;
    entry?: IntersectionObserverEntry;
}
