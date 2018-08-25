'use strict';

import EndlessExcavation from './wonders/endlessExcavation';
import Data from './data';
import HumanData from './humandata';
import {cultureIndex, popIndex, outputIndex} from './util';

let Processed = false;

if (!Processed) {
  for (let building in Data.ElvesData) {
    const data = Data.ElvesData[building];
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
  for (let building in HumanData) {
    const data = HumanData[building];
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
  Data.BuildingMeta["Endless Excavation"] = EndlessExcavation;
  Processed = true;
  Data.markProcessed();
}

