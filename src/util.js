'use strict';

export const cultureIndex = 3;
export const popIndex = 4;
export const outputIndex = 5;
export const chapterIndex = 0;


export function formatNum(num) {
  if (num > 1000) {
    return num.toFixed();
  }
  return num.toPrecision(3);
}
