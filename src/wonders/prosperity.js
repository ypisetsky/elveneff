'use strict';
import EndlessExcavation from './endlessExcavation';

// We only model the supplies. They work just like endless excavation except
// that they are collected every 3 hours (for a lower percent).
module.exports = Object.assign(
  {},
  EndlessExcavation,
  {CustomOut: function(level, collectCount, state) {
    const inheritedFunc = EndlessExcavation.CustomOut;
    // extra wrapper so that 'this' carries over
    return inheritedFunc.call(this, level, collectCount, state) * collectCount;
  }},
);
