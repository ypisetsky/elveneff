'use strict';
import React from 'react';

import {renderChapter} from '../util';
import Building from '../building';

function getMHOutput(state) {
  return (state && state.mainHallOutput) || 120000;
}

const mhLevels = [
  [1,2700], 
  [1,68800],
  [1,13000],
  [1,22000],
  [1,34000],
  [2,48000],
  [2,68000],
  [2,91000],
  [2,120000],
  [3,160000],
  [3,200000],
  [3,240000],
  [3,300000],
  [3,360000],
  [3,440000],
  [6,500000],
  [6,570000],
  [7,660000],
  [7,770000],
  [8,900000],
  [8,1040000],
  [9,1190000],
  [9,1360000],
  [10,1540000],
  [10,1740000],
  [11,1960000],
  [11,2200000],
  [12,2500000],
  [12,2700000],
  [13,3100000],
  [13,3400000],
];

module.exports = {
  Output: "Sup",
  CustomOut: function(level, collectCount, relicBoost, state) {
    console.log(level, collectCount, state);
    return this.getOutput(level) * getMHOutput(state) / 100;
  },
  ConfigFormFactory: function(updater, state) {
    console.log(state);
    const callback = (event) => {
      updater({mainHallOutput: event.target.value});
    }
    const val = getMHOutput(state);
    const opts = [];
    for (let i = 0; i < mhLevels.length; i++) {
      opts.push(<option value={mhLevels[i][1]}>
        Level {i+1} ({renderChapter(mhLevels[i][0])})
      </option>);
    }
    return <span>
      Main Hall Level: 
      <select onChange={callback} value={val} key={val} >{opts}</select>
    </span>;
  },
  GetInitialState: function(props) {
    const res = Building("Residence", props.race);
    const chapter = res.getChapter(props.residenceLevel);
    for (let i = mhLevels.length - 1; i >= 0; i--) {
      if (mhLevels[i][0] <= chapter) {
        console.log(props, mhLevels[i], i);
        return {mainHallOutput: mhLevels[i][1]};
      }
    }
    throw "Misconfigured Endless Excavation";
  }
};
