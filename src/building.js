'use strict';
import Data from './data';
import HumanData from './humandata';
import Images from './images';
import {Value, SumHolder} from './derivation';

export const cultureIndex = 3;
export const popIndex = 4;
const outputIndex = 5;
const chapterIndex = 0;

// Wrapper for building information
class Building {
  constructor(name, race) {
    this.Name = name;
    this.Race = race;
    this.Levels = Data.ElvesData[name];
    if (this.Race == "Humans" && HumanData[name]) {
      this.Levels = HumanData[name];
    }
    const meta = Data.BuildingMeta[name] || {};
    if (!this.Levels) {
      this.Valid = false;
      return;
    }
    this.Valid = true;

    this.Output = meta.Output;

    if (meta.Image) {
      this.Image = meta.Image;
    } else {
      this.Image = Images[name];
    }
    console.log(name, race, this.Image, meta);
    this.UsesSupplies = false;
    if (meta.SuppliesPerOut) {
      this.UsesSupplies = true;
      this.SuppliesPerOut = meta.SuppliesPerOut;
    }
    if (meta.Production) {
      this.Production = meta.Production;
    } else {
      this.Production = Data.GoodsRatios;
    }
  }

  getMinLevel() {
    if (this.name === "Armory (Orcs)") {
      return 20;
    }
    return 1;
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

  getEffectiveCultureDerivation(lvl, cultureDensity, residenceLevel, wsLevel, collectCount, streetCulture) {
    const streetLen = Math.min(this.getWidth(lvl), this.getHeight(lvl)) / 2.0
    //const size = row[1] * row[2] + roads;
    const root = new SumHolder(this.name + " (Level " + lvl + ")");
    root.append(new Value("the building itself", this.getWidth(lvl) * this.getHeight(lvl) * cultureDensity));
    root.append(new Value("the culture requirement of the building", this.getCulture(lvl)));
    const streets = new SumHolder("streets");
    root.append(streets);
    streets.append(new Value("the street itself", streetLen * cultureDensity));
    streets.append(new Value("the culture from the street", -1 * streetLen * streetCulture));

    if (this.Name != "Residence") {
      const res = getBuilding("Residence", this.Race);
      const residenceTerm = res.getEffectiveCultureDerivation(
        residenceLevel,
        cultureDensity,
        residenceLevel,
        wsLevel,
        collectCount,
        streetCulture,
      );
      residenceTerm.scaleBy(
        this.getPop(lvl) / res.getOutput(residenceLevel),
      );
      root.append(residenceTerm);
    }
    if (this.UsesSupplies) {
      let suppliesNeeded = 0;
      let wsOutput = 0;
      const ws = getBuilding("Workshop", this.Race);
      // Count up the supplies used per day and a canonical workshop's production
      // per day. The ratio is how many workshops we need to support this building.
      for(let time in Data.CollectionOptions[collectCount].Collections) {
        suppliesNeeded += this.Production[time] * this.getOutput(lvl) *
          this.SuppliesPerOut * Data.CollectionOptions[collectCount].Collections[time];
        if (!Data.CollectionOptions[collectCount].Collections) {
          console.log(Data.CollectionOptions);
        }
        console.log(ws.Production);
        wsOutput += ws.getOutput(wsLevel) * ws.Production[time] *
          Data.CollectionOptions[collectCount].Collections[time];
      }
      const wsTerm = ws.getEffectiveCultureDerivation(
        wsLevel,
        cultureDensity,
        residenceLevel,
        wsLevel,
        collectCount,
        streetCulture,
      );
      wsTerm.scaleBy(suppliesNeeded / wsOutput);
      root.append(wsTerm);
    }
    return root;
  }
}
const Memoize = {};
export default function getBuilding(name, race) {
  Memoize[name] = Memoize[name] || {};
  return Memoize[name][race] = Memoize[name][race] || new Building(name, race);
}
