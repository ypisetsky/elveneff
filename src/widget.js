'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactTooltip from 'react-tooltip';

import './style.css';
import Data from './data';
import {Derivation} from './derivation';

const cultureIndex = 3;
const popIndex = 4;
const outputIndex = 5;
const chapterIndex = 0;

function formatNum(num) {
  if (num > 1000) {
    return num.toFixed();
  }
  return num.toPrecision(3);
}

class Widget extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBody() {
    const rows = [];
    if (!(this.props.title in Data.BuildingMeta)) {
      return <div>Error: no data on {this.props.title}</div>;
    }
    const data = Data.BuildingData[this.props.title];
    let popHeader = <th>Population</th>;
    const outName = Data.BuildingMeta[this.props.title].Output;
    const id_prefix = Math.floor(Math.random() * 1000000000000);
    for(let i = 0; i < data.length; i++) {
      const w = data[i][1];
      const h = data[i][2];
      const out = data[i][outputIndex];
      const pop = data[i][popIndex];
      const cult = data[i][cultureIndex];
      const buildingSpace = w * h;
      const roadSpace = Math.min(w, h) / 2.0;
      const effectiveCultureDerivation = Data.getEffectiveCultureDerivation(
        this.props.title,
        i,
        this.props.cultureDensity,
        this.props.residenceLevel,
        this.props.workshopLevel,
        this.props.collectCount,
        this.props.streetCulture,
      );
      const effectiveSpaceDerivation = effectiveCultureDerivation.clone();
      effectiveSpaceDerivation.scaleBy(1/this.props.cultureDensity);
      let popCell = <td>{pop}</td>;
      if (this.props.title == "Residence") {
        popCell = null;
        popHeader = null;
      }
      rows.push(
        <tr key={i}>
          <td>{data[i][1]}x{data[i][2]}</td>
          <td>{Data.renderChapter(data[i][chapterIndex])}</td>
          <td>{cult}</td>
          {popCell}
          <td>{out}</td>
          <td>
            <a data-tip="Hello" data-for={this.id_prefix + ":" + i}>
              {formatNum(effectiveCultureDerivation.getSum() / this.props.cultureDensity)}
            </a>
            <ReactTooltip place="top" type="light" effect="float" id={this.id_prefix + ":" + i}>
              <Derivation word="spaces" item={effectiveSpaceDerivation} />
            </ReactTooltip>
          </td>
          <td>{formatNum(out / cult)}</td>
          <td>{formatNum(out / (buildingSpace + roadSpace))}</td>
          <td>{formatNum(out * this.props.cultureDensity / effectiveCultureDerivation.getSum())}</td>
        </tr>
      );
    }

    return <table className="itemTable">
      <tbody>
        <tr>
          <th>Size</th>
          <th>Ch.</th>
          <th>Culture</th>
          {popHeader}
          <th>{outName}</th>
          <th>Spaces used</th>
          <th>{outName}/Culture</th>
          <th>{outName}/Tile</th>
          <th>Effective {outName} / Culture tile</th>
        </tr>
        {rows}
      </tbody>
    </table>;
  }

  render() {
    if (this.props.title in Data.BuildingMeta) {
      return <div className="widget">
        <div align="center"><img src={Data.BuildingMeta[this.props.title].Image} className="buildingImg"/></div>
        {this.renderBody()}
      </div>;
    }
    return <div>Placeholder for {this.props.title}</div>;
  }
}

module.exports = Widget;
