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

export function renderChapter(chapter) {
  switch(chapter) {
    case 1:
      return 'I';
    case 2:
      return 'II';
    case 3:
      return 'III';
    case 4:
      return 'IV';
    case 5:
      return 'V';
    case 6:
      return 'Dwarves';
    case 7:
      return 'Fairies';
    case 8:
      return 'Orcs';
    case 9:
      return 'WdElves';
    case 10:
      return 'Sorcerers';
    case 11:
      return 'Halflings';
    case 12:
      return 'Elemntls';
    case 13:
      return 'Amuni';
  }
}
