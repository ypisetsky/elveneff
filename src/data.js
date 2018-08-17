'use strict';

import {Value, SumHolder} from './derivation';

const cultureIndex = 3;
const popIndex = 4;
const outputIndex = 5;
const chapterIndex = 0;

const BuildingData = {
  Processed: false,
  Residence: [
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
  Workshop: [
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
  ],
  Steel: [
    [1,2,2,0,36,19],
    [1,2,2,5,4,25],
    [1,2,2,4,4,31],
    [1,2,2,7,5,38],
    [2,2,3,17,33,66], // 5
    [2,2,3,4,9,75],
    [2,2,3,4,14,88],
    [2,2,3,5,15,97],
    [4,3,3,30,84,163],
    [4,3,3,9,30,179], // 10
    [4,3,3,9,36,195],
    [4,3,3,10,49,210],
    [4,3,3,12,49,226],
    [4,3,3,13,50,242],
    [4,3,3,14,62,257], // 15
    [6,3,5,135,444,446],
    [6,3,5,50,141,480],
    [6,3,5,59,164,518],
    [6,3,5,70,189,559],
    [9,3,6,131,742,725],
    [9,3,6,106,332,781],
    [9,3,6,125,383,841],
    [9,3,6,148,442,910],
  ],
  Crystal: [
    [ 2,3,2,  0,  92,  28],
    [ 2,3,2,  8,  11,  38],
    [ 2,3,2,  8,  11,  47],
    [ 2,3,2, 11,  13,  56],
    [ 2,3,2, 11,  14,  66], // 5
    [ 2,3,2,  4,  16,  75],
    [ 3,3,3, 29,  11, 132],
    [ 3,3,3,  7,  40, 148],
    [ 3,3,3,  9,  41, 163],
    [ 3,3,3, 10,  51, 179], // 10
    [ 5,4,3, 47, 217, 257],
    [ 5,4,3, 15, 110, 279],
    [ 5,4,3, 18, 112, 301],
    [ 5,4,3, 20, 114, 323],
    [ 5,4,3, 22, 143, 342], // 15
    [ 7,4,4,159, 436, 493],
    [ 7,4,4, 68, 236, 534],
    [ 7,4,4, 80, 272, 574],
    [ 7,4,4, 95, 313, 618],
    [10,4,5,294,1007, 835], // 20
    [10,4,5,165, 516, 901],
    [10,4,5,194, 596, 973],
    [10,4,5,230, 687,1048],
  ],
  Elixir: [
    [3,4,3,0,211,56],
    [3,4,3,19,24,75],
    [3,4,3,18,26,91],
    [3,4,3,24,29,113],
    [4,4,4,55,139,176], // 5
    [4,4,4,13,48,204],
    [4,4,4,14,68,232],
    [4,4,4,16,81,260],
    [5,4,5,62,260,361],
    [5,4,5,25,131,395], // 10
    [5,4,5,27,157,430],
    [5,4,5,31,210,464],
    [5,4,5,33,214,502],
    [5,4,5,38,218,537],
    [5,4,5,42,271,571], // 15
    [8,4,5,123,81,618],
    [8,4,5,97,333,665],
    [8,4,5,114,384,719],
    [8,4,5,135,443,775],
    [11,6,4,369,1280,1004], // 20
    [11,6,4,226,708,1083],
    [11,6,4,267,817,1167],
    [11,6,4,314,943,1262],
  ],
  "Armory (Training)": [
    [1,2,2,0,18,3],
    [1,2,2,10,3,4],
    [1,2,2,16,3,5],
    [1,2,2,22,3,6],
    [2,3,3,121,42,14], // 5
    [2,3,3,32,9,15],
    [2,3,3,25,10,16],
    [2,3,3,26,12,17],
    [4,4,4,241,98,31],
    [4,4,4,58,32,32], // 10
    [4,4,4,46,31,33],
    [4,4,4,46,42,34],
    [4,4,4,47,42,36],
    [4,4,4,48,53,40], // 15
    [6,5,4,408,156,50],
    [6,5,4,135,37,60],
    [7,6,3,67,32,70],
    [7,6,3,84,33,80],
    [8,5,5,795,295,130], // 20
    [8,5,5,235,105,140],
    [8,5,5,292,115,150],
    [8,5,5,315,126,160],
    [10,6,4,200,79,170],
    [10,6,4,352,151,185], // 25
    [10,6,4,394,159,200],
    [10,6,4,428,177,215],
    [12,7,3,225,95,230],
    [12,7,3,236,100,245],
    [12,7,3,364,113,260], // 30
    [12,7,3,556,218,280],
  ],
  "Armory (Orcs)": [
    [8,5,5,795,295,380], // 20
    [8,5,5,235,105,420],
    [8,5,5,292,115,470],
    [8,5,5,315,126,520],
    [10,6,4,200,79,580],
    [10,6,4,352,151,640], // 25
    [10,6,4,394,159,700],
    [10,6,4,428,177,770],
    [12,7,3,225,95,840],
    [12,7,3,236,100,920],
    [12,7,3,364,113,1000], // 30
    [12,7,3,556,218,1090],
  ],
  "Mercenary Camp": [
    [7,4,4,0,100,59],
    [7,4,4,250,115,71],
    [7,4,4,288,132,84],
    [7,4,4,331,152,98],
    [9,3,6,380,175,113], // 5
    [9,3,6,437,201,129],
    [9,3,6,503,231,146],
    [9,3,6,578,266,164],
    [11,4,5,665,306,184],
    [11,4,5,765,352,200], //10
    [11,4,5,880,405,230],
    [11,4,5,1012,465,250],
    [13,6,4,1163,535,270],
    [13,6,4,1338,615,300],
    [13,6,4,1539,708,320], // 15
    [13,6,4,1769,814,350],
  ],
  "Training Grounds": [
    [2,3,3,90,29,3],
    [2,3,3,90,29,5],
    [2,3,3,104,33,7],
    [2,3,3,119,38,11],
    [5,3,4,137,44,17], // 5
    [5,3,4,158,50,23],
    [5,3,4,181,58,31],
    [5,3,4,208,67,49],
    [8,5,3,240,77,71],
    [8,5,3,276,88,98], // 10
    [8,5,3,317,101,113],
    [8,5,3,365,117,129],
    [10,3,6,419,134,146],
    [10,3,6,482,154,164],
    [10,3,6,554,177,184], // 15
    [10,3,6,638,204,200],
    [12,5,4,733,234,230],
    [12,5,4,843,270,250],
    [12,5,4,971,310,270],
    [12,5,4,1115,357,300], // 20
  ],
  Barracks: [
    [1,4,3,0,9,1],
    [1,4,3,10,8,2],
    [1,4,3,28,12,3],
    [1,4,3,56,16,5],
    [1,4,3,97,22,5], // 5
    [2,5,4,82,25,6],
    [2,5,4,98,34,7],
    [2,5,4,116,42,9],
    [2,5,4,134,49,11],
    [3,6,5,153,63,14], // 10
    [3,6,5,171,78,17],
    [3,6,5,191,105,20],
    [3,6,5,211,118,23],
    [3,6,5,231,131,27],
    [3,6,5,251,166,31], // 15
    [6,4,8,388,77,39],
    [6,4,8,436,152,49],
    [7,4,7,489,173,59],
    [7,4,7,549,169,71],
    [8,4,7,614,245,84], // 20
    [8,4,7,686,274,98],
    [9,5,7,766,279,113],
    [9,5,7,855,289,129],
    [9,5,7,954,355,146],
    [9,5,7,1061,410,164], // 25
    [11,6,6,1182,434,184],
    [11,6,6,1314,493,200],
    [11,6,6,1460,573,230],
    [11,6,6,1622,493,250],
    [13,5,8,1801,690,270], // 30
    [13,5,8,197,712,300],
    [13,5,8,2216,785,320],
    [13,5,8,2455,999,350],
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

const GoodsRatios = {
  180: 0.319,
  540: 0.583,
  1440: 1,
  2880: 1.464,
}

const CollectionOptions = {
  1: {
    Collections: {
      1440: 1,
    },
    Description: "One 24h",
  },
  2: {
    Collections: {
      540: 2,
    },
    Description: "Two 9h",
  },
  3: {
    Collections: {
      540: 2,
      180: 1,
    },
    Description: "Two 9h, one 3h",
  },
  4: {
    Collections: {
      540: 1,
      180: 3,
    },
    Description: "One 9h, three 3h",
  },
  5: {
    Collections: {
      540: 1,
      180: 4,
    },
    Description: "One 9h, four 3h"
  },
  6: {
    Collections: {
      540: 1,
      180: 5,
    },
    Description: "One 9h, five 3h"
  },
}

const BuildingMeta = {
  Residence: {
    Image: "residence.png",
    Output: "Pop",
  },
  Workshop: {
    Image: "workshop.png",
    Output: "Sup",
    Production: {
      5: 0.153,
      15: 0.406,
      60: 1,
      180: 1.935,
      540: 3.33,
      1440: 4.86,
    },
  },
  Marble: {
    Image: "marble.png",
    Output: "Marble",
    Production: GoodsRatios,
    SuppliesPerOut: 2,
  },
  Steel: {
    Image: "steel.png",
    Output: "Steel",
    Production: GoodsRatios,
    SuppliesPerOut: 2,
  },
  Crystal: {
    Image: "crystal.png",
    Output: "Crystal",
    Production: GoodsRatios,
    SuppliesPerOut: 8,
  },
  Elixir: {
    Image: "elixir.png",
    Output: "Elixir",
    Production: GoodsRatios,
    SuppliesPerOut: 32,
  },
  "Armory (Training)": {
    Image: "armory.png",
    Output: "Train Size",
  },
  "Armory (Orcs)": {
    Image: "armory.png",
    Output: "Orcs",
  },
  "Mercenary Camp": {
    Image: "mercs.png",
    Output: "Military Speed",
  },
  "Training Grounds": {
    Image: "mercs.png",
    Output: "Military Speed",
  },
  Barracks: {
    Image: "mercs.png",
    Output: "Military Speed",
  }
}

const Roads = {
  10: { Name: "Simple Trail", Chapter: 1},
  20: { Name: "Cobbled Road", Chapter: 3},
  30: { Name: "Ornate Street", Chapter: 5},
  49: { Name: "Dwarven St.", Chapter: 6},
  63: { Name: "Blossom St.", Chapter: 7},
  77: { Name: "Wooden Trail", Chapter: 8},
  95: { Name: "Greenery St", Chapter: 9},
  117: { Name: "Lore St.", Chapter: 10},
  144: { Name: "Country Ln", Chapter: 11},
  176: { Name: "Eternal St", Chapter: 12},
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
      return 'Orcs';
    case 9:
      return 'WdElves';
    case 10:
      return 'Sorcerers';
    case 11:
      return 'Halflings';
    case 12:
      return 'Elemntls';
  }
}

function getEffectiveCultureDerivation(name, lvl, cultureDensity, residenceLevel, wsLevel, collectCount, streetCulture) {
  const row = BuildingData[name][lvl];
  const streetLen = Math.min(row[1], row[2]) / 2.0
  //const size = row[1] * row[2] + roads;
  const root = new SumHolder(name);
  root.append(new Value("The building itself", row[1] * row[2] * cultureDensity));
  root.append(new Value("The culture requirement of the building", row[cultureIndex]));
  const streets = new SumHolder("Streets");
  root.append(streets);
  streets.append(new Value("The street itself", streetLen * cultureDensity));
  streets.append(new Value("The culture from the street", -1 * streetLen * streetCulture));

  if (name != "Residence") {
    const residenceTerm = getEffectiveCultureDerivation("Residence", residenceLevel, cultureDensity, residenceLevel, wsLevel, collectCount, streetCulture);
    residenceTerm.scaleBy(
      row[popIndex] / BuildingData.Residence[residenceLevel][outputIndex]
    );
    root.append(residenceTerm);
  }
  if (BuildingMeta[name].SuppliesPerOut) {
    let suppliesNeeded = 0;
    let wsOutput = 0;
    for(let time in CollectionOptions[collectCount].Collections) {
      suppliesNeeded += BuildingMeta[name].Production[time] * row[outputIndex] * BuildingMeta[name].SuppliesPerOut * CollectionOptions[collectCount].Collections[time];
      console.log(wsLevel,BuildingData.Workshop[wsLevel], BuildingMeta.Workshop.Production,CollectionOptions[collectCount].Collections);
      wsOutput += BuildingData.Workshop[wsLevel][outputIndex] * BuildingMeta.Workshop.Production[time] * CollectionOptions[collectCount].Collections[time];
    }
    const wsTerm = getEffectiveCultureDerivation("Workshop", wsLevel, cultureDensity, residenceLevel, wsLevel, collectCount, streetCulture);
    wsTerm.scaleBy(suppliesNeeded / wsOutput);
    root.append(wsTerm);
  }
  console.log(name, lvl, cultureDensity, residenceLevel, wsLevel, collectCount, streetCulture, root, root.getSum());
  return root;
}

function renderTime(minutes) {
  const renderString = (num, label) => {
    if (num == 1) {
      return "1 " + label;
    } return num + " " + label + "s";
  }
  if (minutes < 60) {
    return renderString(minutes, "minute");
  } else if (minutes < 1440) {
    return renderString(minutes / 60., "hour");
  } else return renderString(minutes / 1440., "day");
}

module.exports = {
  BuildingData: BuildingData,
  BuildingMeta: BuildingMeta,
  CollectionOptions: CollectionOptions,
  GoodsRatios: GoodsRatios,
  Roads: Roads,
  renderChapter: renderChapter,
  getEffectiveCultureCost: getEffectiveCultureCost,
  renderTime: renderTime,
}
