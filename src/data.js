'use strict';

const cultureIndex = 3;
const popIndex = 4;
const outputIndex = 5;
const chapterIndex = 0;

const BuildingData = {
  "Processed": false,
  "Residence": [
    [ 1,2,2,0,   0,31],
    [ 1,2,2,3,   0,4],
    [ 1,2,2,4,   0,5],
    [ 2,2,3,12,  0,28],
    [ 2,2,3,11,  0,10], // 5
    [ 2,2,3,6,   0,10],
    [ 2,2,3,4,   0,12],
    [ 3,3,3,27,  0,70],
    [ 3,3,3,7,   0,20],
    [ 3,3,3,9,   0,30], // 10
    [ 3,3,3,7,   0,30],
    [ 3,3,3,6,   0,40],
    [ 3,3,3,7,   0,40],
    [ 3,3,3,8,   0,40],
    [ 3,3,3,7,   0,50], // 15
    [ 6,2,4,37,  0,20],
    [ 6,2,4,17,  0,30],
    [ 7,2,4,18,  0,40],
    [ 7,2,4,20,  0,40],
    [ 8,4,3,137, 0,200], // 20
    [ 8,4,3,35,  0,150],
    [ 9,4,3,46,  0,190],
    [ 9,4,3,47,  0,110],
    [10,3,5,181, 0,450],
    [10,3,5,68,  0,170], // 25
    [11,3,5,76,  0,180],
    [11,3,5,83,  0,200],
    [12,4,4,158, 0,400],
    [12,4,4,108, 0,200],
  ],
  "Workshop": [
    [ 1,2,2,   0, 18,  29],
    [ 1,2,2,   2,  6,  53],
    [ 1,2,2,   5,  8,  74],
    [ 1,2,2,   7,  8,  94],
    [ 2,3,2,  21, 32, 169], // 5
    [ 2,3,2,   6,  9, 196],
    [ 2,3,2,   6, 12, 223],
    [ 2,3,2,   6, 14, 249],
    [ 3,4,3,  63,130, 547],
    [ 3,4,3,  11, 32, 596], // 10
    [ 3,4,3,   9, 33, 644],
    [ 3,4,3,  10, 45, 691],
    [ 3,4,3,   8, 41, 738],
    [ 3,4,3,   8, 39, 783],
    [ 3,4,3,   7, 49, 828], // 15
    [ 6,5,3, 122,136,1090],
    [ 6,5,3,  34, 48,1160],
    [ 7,3,6, 109,202,1470],
    [ 7,3,6,  48, 60,1550],
    [ 8,3,6,  51,101,1640], // 20
    [ 8,3,6,  56,109,1740],
    [ 9,4,5, 141,257,2040],
    [ 9,4,5,  82,145,2160],
    [10,4,5,  88,159,2280],
    [10,4,5,  96,179,2410], // 25
    [11,3,7, 162,293,2680],
    [11,3,7, 122,222,2830],
    [12,3,7, 137,263,3000],
    [12,3,7, 149,209,3170],
    [13,4,6, 413,764,3830],
    [13,4,6, 207,356,4050],
  ],
  Marble: [
    [ 1,1,2,  0,  20,  9],
    [ 1,1,2,  2,   2, 13],
    [ 1,1,2,  2,   3, 16],
    [ 1,1,2,  3,   2, 19],
    [ 1,1,2,  3,   3, 22], // 5
    [ 2,2,2, 12,  38, 50],
    [ 2,2,2,  3,   9, 56],
    [ 2,2,2,  3,  12, 66],
    [ 2,2,2,  3,  12, 72],
    [ 4,3,2, 20,  72,119], // 10
    [ 4,3,2,  6,  27,129],
    [ 4,3,2,  6,  36,138],
    [ 4,3,2,  7,  36,151],
    [ 4,3,2,  8,  38,160],
    [ 4,3,2,  9,  46,173], // 15
    [ 6,2,5, 82, 328,298],
    [ 6,2,5, 30, 105,320],
    [ 6,2,5, 36, 122,345],
    [ 6,2,5, 42, 139,373],
    [ 9,6,3,311,1110,725], // 20
    [ 9,6,3,106, 332,781],
    [ 9,6,3,125, 383,841],
    [ 9,6,3,148, 442,910],
  ]
}

if (!BuildingData.Processed) {
  for (let building in BuildingData) {
    const data = BuildingData[building];
    for(let i = 1; i < data.length; i++) {
      if (building == "Residence") {
        // For some reason the wiki only gives marginal increase for residences
        // while giving total for everything else. /shrug
        data[i][outputIndex] += data[i-1][outputIndex];
      }
      data[i][cultureIndex] += data[i-1][cultureIndex];
      data[i][popIndex] += data[i-1][popIndex];
    }
  }
  BuildingData.Processed = true;
}


const BuildingMeta = {
  Residence: {
    Image: "residence.png",
    Output: "Pop",
  },
  Workshop: {
    Image: "workshop.png",
    Output: "Sup",
  },
  Marble: {
    Image: "marble.png",
    Output: "Marble",
  }
}

function renderChapter(chapter) {
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
      return 'Goblins';
    case 9:
      return 'Woodelves';
    case 10:
      return 'Sorcerors';
    case 11:
      return 'Halflings';
    case 12:
      return 'Elementals';
  }
}

function getEffectiveCultureCost(name, lvl, cultureDensity, residenceLevel) {
  console.log(name,lvl);
  const row = BuildingData[name][lvl];
  const size = row[1] * row[2] + Math.min(row[1], row[2]) / 2.0;
  let result = row[cultureIndex] + size * cultureDensity;
  if (name != "Residence") {
    result += row[popIndex] * getEffectiveCultureCost("Residence", residenceLevel, cultureDensity, residenceLevel) /
      BuildingData.Residence[residenceLevel][outputIndex];
  }
  console.log(name,lvl,cultureDensity,residenceLevel, result, row[cultureIndex] + size * cultureDensity);
  return result;
}

module.exports = {
  BuildingData: BuildingData,
  BuildingMeta: BuildingMeta,
  renderChapter: renderChapter,
  getEffectiveCultureCost: getEffectiveCultureCost,
}
