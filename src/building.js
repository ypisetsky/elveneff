'use strict';
import Data from './data';
import Images from './images';

export const cultureIndex = 3;
export const popIndex = 4;
export const outputIndex = 5;
const chapterIndex = 0;

// Wrapper for building information
export default class Building {
  constructor(name, race) {
    this.Name = name;
    this.Race = race;
    this.Levels = Data.BuildingData[name];
    const meta = Data.BuildingMeta[name] || {};

    this.Output = meta.Output;

    if (meta.Image) {
      this.Image = meta.Image;
    } else {
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

  getMinLevel() {
    return 0;
  }

  getMaxLevel() {
    return this.getMinLevel() + this.Levels.length - 1;
  }

  _getRow(level) {
    return this.Levels[level - this.getMinLevel()];
  }

  getChapter(level) {
    return this._getRow(level)[chapterIndex];
  }

  getWidth(level) {
    return this._getRow(level)[1];
  }

  getHeight(level) {
    return this._getRow(level)[2];
  }

  getCulture(level) {
    return this._getRow(level)[cultureIndex];
  }

  getPop(level) {
    return this._getRow(level)[popIndex];
  }

  getOutput(level) {
    return this._getRow(level)[outputIndex];
  }
}
