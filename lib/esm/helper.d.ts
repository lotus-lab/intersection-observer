import { IntersectionCallback, OptionsType } from './types';
export declare const checkRootObject: (options: OptionsType) => any;
export declare const updateAdTimer: (adBox: HTMLElement) => void;
export declare const handleVisibilityChange: () => void;
export declare const intersectionCallback: ({ entries, inViewStateForObserveOnce, observerOptions, observer, setInViewData, }: IntersectionCallback) => void;
