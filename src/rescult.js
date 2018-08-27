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
      output: 0,
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
    let goodsOut = [];
    if (this.state.output) {
      const goodsBuilding = Building({
        name: "Custom Building",
        basicStats: [1, this.state.width, this.state.height, -culture, -residence, this.state.output],
        Output: "Goods",
      }, this.props.race);
      const goodsSpace = goodsBuilding.getEffectiveCultureDerivation(
        1, // only one "level"
        this.props.cultureDensity,
        this.props.residenceLevel,
        this.props.residenceLevel, // ignored
        1, // collect count (TODO: improve this)
        this.props.streetCulture,
      );
      goodsSpace.scaleBy(1/this.props.cultureDensity);
      goodsOut.push(
        <tr>
          <td>Effective spaces used</td>
          <td>{goodsSpace.getSum()}</td>
        </tr>,
        <tr>
          <td>Efficiency</td>
          <td>{goodsBuilding.getDailyOutput(
            1, 1, 0, null) / goodsSpace.getSum()}</td>
        </tr>,
      );

      console.log(goodsBuilding, goodsSpace);
    }
      
      
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
            <td>Tier 1</td>
            <td><input type="text" name="output"
              value={this.state.output} onChange={this.changer} />
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
          {goodsOut}
        </tbody>
      </table>
    </div>;
  }
  changer(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }
}

module.exports = ResidenceCultureChecker;
