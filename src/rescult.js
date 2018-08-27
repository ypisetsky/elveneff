'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Data from './data';
import Building from './building';
import {formatNum, outputIndex} from './util';

class ResidenceCultureChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 3,
      height: 4,
      pop: 600,
      cult: 600,
      output1d: 0,
      output3h: 0,
      output9h: 0,
    }
    this.changer = this.changer.bind(this);
  }
  render() {
    let culture = parseInt(this.state.cult);
    let residence = Building("Residence", this.props.race);
    let culturePerResidence = residence.getEffectiveCultureDerivation(
      this.props.residenceLevel,
      this.props.cultureDensity,
      this.props.residenceLevel, // ignored
      this.props.residenceLevel, // ignored
      1, // collections per day; doesn't really matter
      this.props.streetCulture,
    ).getSum();
    culture += culturePerResidence * this.state.pop /
      residence.getOutput(this.props.residenceLevel);
      
    return <div className="widget">
      <table>
        <tbody>
          <tr>
            <td>Size</td>
            <td>
              <input type="text" name="width"
                value={this.state.width} onChange={this.changer} />
              x
              <input type="text" name="height"
                value={this.state.height} onChange={this.changer} />
            </td>
          </tr>
          <tr>
            <td>Population</td>
            <td><input type="text" name="pop"
              value={this.state.pop} onChange={this.changer} />
            </td>
          </tr>
          <tr>
            <td>Culture</td>
            <td><input type="text" name="cult"
              value={this.state.cult} onChange={this.changer} />
            </td>
          </tr>
          <tr>
            <td>1 day output</td>
            <td><input type="text" name="output1d"
              value={this.state.output1d} onChange={this.changer} />
            </td>
          </tr>
          <tr>
            <td>3 hour output</td>
            <td><input type="text" name="output3h"
              value={this.state.output3h} onChange={this.changer} />
            </td>
          </tr>
          <tr>
            <td>9 hour output</td>
            <td><input type="text" name="output9h"
              value={this.state.output9h} onChange={this.changer} />
            </td>
          </tr>
          <tr>
            <td>Effective Culture</td>
            <td>{formatNum(culture)}</td>
          </tr>
          <tr>
            <td>Culture Per Tile</td>
            <td>{formatNum(culture / this.state.width / this.state.height)}</td>
          </tr>
          {this.getGoodsOutput(culture)}
        </tbody>
      </table>
      <p>Use this calculator to figure out the efficiency of event buildings. It
        supports both residence/culture buildings (and tells you the effective
        culture per tile based on the residence level and culture density
        provided) as well as buildings which produce other goods which don't
        consume supplies. If you specify 3h/9h production numbers, then the
        collect count will be used to normalize production to a day.
      </p>
    </div>;
  }
  
  changer(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  getGoodsOutput(culture) {
    if (this.state.output1d || this.state.output3h || this.state.output9h) {
      const production = {};
      if (this.state.output3h) {
        production[180] = parseInt(this.state.output3h);
      }
      if (this.state.output3h || this.state.output9h) {
        production[540] = parseInt(this.state.output9h || this.state.output3h);
      }
      production[1440] = parseInt(this.state.output1d || this.state.output9h || this.state.output3h);
      const goodsBuilding = Building({
        name: "Custom Building",
        basicStats: [1, this.state.width, this.state.height, -culture, -1 * parseInt(this.state.pop), 1],
        Production: production,
        Output: "Goods",
      }, this.props.race);
      const goodsSpace = goodsBuilding.getEffectiveCultureDerivation(
        1, // only one "level"
        this.props.cultureDensity,
        this.props.residenceLevel,
        this.props.residenceLevel, // ignored
        this.props.collectCount, // collect count (TODO: improve this)
        this.props.streetCulture,
      );
      console.log(goodsSpace);
      goodsSpace.scaleBy(1/this.props.cultureDensity);
      return [
        <tr>
          <td>Effective spaces used</td>
          <td>{goodsSpace.getSum()}</td>
        </tr>,
        <tr>
          <td>Daily output</td>
          <td>{goodsBuilding.getDailyOutput(
            1, this.props.collectCount, 0, null,)}</td>
        </tr>,
        <tr>
          <td>Efficiency</td>
          <td>{goodsBuilding.getDailyOutput(
            1, this.props.collectCount, 0, null) / goodsSpace.getSum()}</td>
        </tr>,
      ];
    }
    return [];
  }
}

module.exports = ResidenceCultureChecker;
