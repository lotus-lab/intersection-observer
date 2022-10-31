import { useCallback, useEffect, useRef, useState } from 'react';

import { InViewDataTypes, OptionsType } from './types';
import { checkRootObject, intersectionCallback } from './helper';

export const useInViewTrigger = (options?: OptionsType) => {
  const [inViewData, setInViewData] = useState<InViewDataTypes>({
    inView: false,
    visibilityTime: 0,
    entry: null,
  });
  const observerOptions: OptionsType = {
    root: window.document,
    threshold: 0.5,
    rootMargin: '0px',
    ...options,
  };
  const inViewStateForObserveOnce = useRef(false);
  const root = checkRootObject(observerOptions);
  const targetRef = useRef<any>(null);
  const observer = new IntersectionObserver(
    entries => {
      intersectionCallback({
        entries,
        inViewStateForObserveOnce,
        observer,
        observerOptions,
        setInViewData,
        targetRef,
        inViewData,
      });
    },
    {
      ...observerOptions,
      root,
    },
  );

  const handleObserver = useCallback(() => {
    if (targetRef?.current) {
      observer.observe(targetRef?.current!);
    }
  }, []);

  useEffect(() => {
    handleObserver();
  }, [handleObserver]);

  return { targetRef, ...inViewData };
};
