import { OptionsType } from './types';

export const checkRootObject = (options: OptionsType) => {
  if (!(options?.root instanceof Document)) {
    return options?.root?.current;
  }
  return options?.root;
};

const allTimes: Array<number> = [];

export function visibilityTimer(adBox: HTMLElement) {
  const lastStarted = adBox.dataset.lastViewStarted;
  const currentTime = performance.now();
  let totalViewTime = 0;
  if (lastStarted) {
    const diff = currentTime - parseFloat(lastStarted);
    totalViewTime += diff;
  }

  adBox.dataset.lastViewStarted = currentTime.toString();
  allTimes.push(Math.round(totalViewTime));
  return allTimes.reduce((curr: number, prev: number) => {
    prev += curr;
    return prev;
  }, 0);
}
