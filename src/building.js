'use strict';
import Data from './data';
import HumanData from './humandata';
import Images from './images';
import ImagesH from './humanimg';
import {Value, SumHolder} from './derivation';

export const cultureIndex = 3;
export const popIndex = 4;
const outputIndex = 5;
const chapterIndex = 0;

// Wrapper for building information
class Building {
  constructor(name, race) {
    this.name = name;
    this.race = race;
    Data.assertProcessed();
    this.levels = Data.ElvesData[name];
    if (this.race == "Humans" && HumanData[name]) {
      this.levels = HumanData[name];
    }
    const meta = Data.BuildingMeta[name] || {};
    if (!this.levels) {
      this.Valid = false;
      return;
    }
    this.Valid = true;

    this.Output = meta.Output;

    if (meta.Image) {
      this.Image = meta.Image;
    } else if (this.race == "Humans" && ImagesH[name]){
      this.Image = ImagesH[name];
    } else {
      this.Image = Images[name];
    }
    this.usesSupplies = false;
    this.usesRelics = false;
    if (meta.SuppliesPerOut) {
      this.usesSupplies = true;
      this.SuppliesPerOut = meta.SuppliesPerOut;
    }
    if (meta.Production) {
      this.Production = meta.Production;
    } else if (this.usesSupplies) {
      this.usesRelics = true;
      this.Production = Data.GoodsRatios;
    }

    if (meta.CustomOut) {
      this.getDailyOutput = meta.CustomOut;
    }

    if (meta.ConfigFormFactory) {
      this.ConfigFormFactory = meta.ConfigFormFactory;
    }

    if (meta.GetInitialState) {
      this.GetInitialState = meta.GetInitialState;
    }
  }

  getMinLevel() {
    if (this.name === "Armory (Orcs)") {
      return 20;
    }
    return 1;
  }

  getMaxLevel() {
    return this.getMinLevel() + this.levels.length - 1;
  }

  _getRow(level) {
    return this.levels[level - this.getMinLevel()];
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

  getOutput(level, relicBoost) {
    const ret = this._getRow(level)[outputIndex];
    if (relicBoost && this.usesRelics) {
      return ret * (1 + relicBoost/100);
    }
    return ret;
  }

  getDailyOutput(level, collectCount, relicBoost, extras) {
    console.log(this.name, level,collectCount, relicBoost, extras);
    let out = 0;
    if (!this.Production) {
      return this.getOutput(level, relicBoost);
    }
    for(let time in Data.CollectionOptions[collectCount].Collections) {
      out += this.Production[time] * this.getOutput(level, relicBoost) *
        Data.CollectionOptions[collectCount].Collections[time];
    }
    return out;
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

    if (this.name != "Residence") {
      const res = getBuilding("Residence", this.race);
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
    if (this.usesSupplies) {
      let suppliesNeeded = 0;
      let wsOutput = 0;
      const ws = getBuilding("Workshop", this.race);
      // Count up the supplies used per day and a canonical workshop's production
      // per day. The ratio is how many workshops we need to support this building.
      for(let time in Data.CollectionOptions[collectCount].Collections) {
        // Assume 0 relic boost since relics don't increase the cost, just the
        // actual output.
        suppliesNeeded += this.Production[time] * this.getOutput(lvl, 0) *
          this.SuppliesPerOut * Data.CollectionOptions[collectCount].Collections[time];
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
