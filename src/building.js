'use strict';
import Data from './data';
import Images from './images';

// Wrapper for building information
class Building {
  constructor(name, race) {
    this.Name = name;
    this.Race = race;
    this.Levels = Data.BuildingData[name];
    const meta = Data.BuildingMeta || {};

    if (meta.Image) {
      this.Image = meta.Image;
    } ele {
      this.Image = Images[name];
    }

    this.UsesSupplies = false;
    if (meta.SuppliesPerOut) {
      this.UsesSupplies = true;
      this.SuppliesPerOut = meta.SuppliesPerOut;
      if (meta.Production) {
        this.Production = meta.Production;
      } else {
        this.Production = Data.GoodsRatios;
      }
    }
  }
}
