import { useCallback, useEffect, useRef, useState } from 'react';

import { InViewDataTypes, OptionsType } from './types';
import { checkRootObject, visibilityTimer } from './helper';

export const useInViewTrigger = (options?: OptionsType) => {
  const [inViewData, setInViewData] = useState<InViewDataTypes>({
    inView: false,
    visibilityTime: 0,
  });

  const observerOptions = {
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
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observerOptions?.callback?.();
          inViewStateForObserveOnce.current = true;
          return setInViewData({
            inView: true,
            visibilityTime: visibilityTimer(entry.target as never),
            entry
          });
        }
        if (observerOptions.observeOnce && inViewStateForObserveOnce.current) {
          return observer.disconnect();
        }
        return setInViewData({
          inView: false,
        });
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
