import { IntersectionCallback, OptionsType } from './types';

let visibleAds: Set<any> | null = new Set();
let previouslyVisibleAds: Set<any> | null = null;

export const checkRootObject = (options: OptionsType) => {
  if (!(options?.root instanceof Document)) {
    return options?.root?.current;
  }
  return options?.root;
};

let totalViewTime: number = 0;

export const updateAdTimer = (adBox: HTMLElement) => {
  const lastStarted = adBox.dataset.lastViewStarted;
  const currentTime = performance.now();

  if (lastStarted) {
    const diff = currentTime - parseFloat(lastStarted);

    totalViewTime += diff;
  }

  adBox.dataset.lastViewStarted = currentTime.toString();
  
};

export const handleVisibilityChange = () => {
  if (!previouslyVisibleAds) {
    previouslyVisibleAds = visibleAds;
    // @ts-ignore
    visibleAds = [];
    previouslyVisibleAds?.forEach(adBox => {
      updateAdTimer(adBox);
      adBox.dataset.lastViewStarted = 0;
    });
  } else {
    previouslyVisibleAds?.forEach(adBox => {
      adBox.dataset.lastViewStarted = performance.now();
    });
    visibleAds = previouslyVisibleAds;
    previouslyVisibleAds = null;
  }
};

export const intersectionCallback = ({
  entries,
  inViewStateForObserveOnce,
  observerOptions,
  observer,
  setInViewData,
}: IntersectionCallback) => {
  entries.forEach(entry => {
    const adBox: HTMLElement | Element = entry.target;
    handleVisibilityChange();
    if (entry.isIntersecting) {
      // @ts-ignore
      adBox.dataset.lastViewStarted = entry.time;
      visibleAds?.add(adBox);
      inViewStateForObserveOnce.current = true;

      observerOptions?.callback?.({
        entry,
        inView: true,
        visibilityTime: totalViewTime,
      });

      setInViewData({
        inView: true,
        visibilityTime: totalViewTime,
        entry,
      });
    } else {
      setInViewData({
        inView: false,
        visibilityTime: observerOptions.getLastVisibleData
          ? totalViewTime
          : undefined,
        entry,
      });
      visibleAds?.delete(adBox);
    }

    if (observerOptions.observeOnce && inViewStateForObserveOnce.current) {
      return observer.disconnect();
    }
  });
};
