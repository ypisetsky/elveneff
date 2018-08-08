'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Data from './data';

const cultureIndex = 3;
const popIndex = 4;
const outputIndex = 5;
const chapterIndex = 0;

function formatNum(num) {
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
    for(let i = 0; i < data.length; i++) {
      const w = data[i][1];
      const h = data[i][2];
      const out = data[i][outputIndex];
      const pop = data[i][popIndex];
      const cult = data[i][cultureIndex];
      const buildingSpace = w * h;
      const roadSpace = Math.min(w, h) / 2.0;
      const effectiveCultureCost = Data.getEffectiveCultureCost(this.props.title, i, this.props.cultureDensity, this.props.residenceLevel);
      let popCell = <td>{pop}</td>;
      if (this.props.title == "Residence") {
        popCell = null;
        popHeader = null;
      }
      rows.push(
        <tr key={i}>
          <td>{data[i][1]} x {data[i][2]}</td>
          <td>{Data.renderChapter(data[i][chapterIndex])}</td>
          <td>{cult}</td>
          {popCell}
          <td>{out}</td>
          <td>{formatNum(out / cult)}</td>
          <td>{formatNum(out / (buildingSpace + roadSpace))}</td>
          <td>{formatNum(out / effectiveCultureCost)}</td>
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
          <th>{outName}/Culture</th>
          <th>{outName}/Tile</th>
          <th>Effective {outName} per culture</th>
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
