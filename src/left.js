'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import Data from './data';

class LeftNav extends React.Component {
  render() {
    const resOptions= [];
    const resData = Data.BuildingData["Residence"];
    for (let i = 0; i < resData.length; i++) {
      resOptions.push(
        <option value={i} key={i}>
          Level {i+1} ({Data.renderChapter(resData[i][0])})
        </option>
      );
    }

    const wsOptions= [];
    const wsData = Data.BuildingData["Workshop"];
    for (let i = 0; i < wsData.length; i++) {
      wsOptions.push(
        <option value={i} key={i}>
          Level {i+1} ({Data.renderChapter(wsData[i][0])})
        </option>
      );
    }

    const collectOpts = [];
    console.log(Data.CollectionOptions);
    for (let i in Data.CollectionOptions) {
      collectOpts.push(
        <option value={i} key={i}>
          {Data.CollectionOptions[i].Description}
        </option>
      );
    }

    const streetOpts = [];
    for (let i in Data.Roads) {
      streetOpts.push(
        <option value={i} key={i}>
          {Data.Roads[i].Name}({Data.renderChapter(Data.Roads[i].Chapter)})
        </option>
      );
    }

    const chapters = [];
    for(let i = 1; i <= 12; i++) {
      chapters.push(
        <option value={i} key={i}>Chapter {i} ({Data.renderChapter(i)})</option>
      );
    }


    return <form>
      <b>Select Chapter</b>
      <select onChange={this.props.onChapterSelect}>
        <option value={null} selected={true}>--- Select a Chapter ---</option>
        {chapters}
      </select>
      <br />
      <b>Daily Collections</b>:
      <select name="collectCount" onChange={this.props.onChange}
        value={this.props.collectCount}>
        {collectOpts}
      </select>
      <hr />
      <b>Specific parameters</b>
      <br />
      Culture Density:
      <input type="text" size="5" value={this.props.cultureDensity}
        name="cultureDensity" onChange={this.props.onChange} />
      <br />
      Residence Level:
      <select name="residenceLevel" value={this.props.residenceLevel}
        onChange={this.props.onChange} >
        {resOptions}
      </select>
      <br />
      Workshop Level:
      <select name="workshopLevel" onChange={this.props.onChange}
        value={this.props.workshopLevel} >
        {wsOptions}
      </select>
      <br />
      Streets: <select name="streetCulture" onChange={this.props.onChange}
        value={this.props.streetCulture} >
        {streetOpts}
      </select>
    </form>;
  }
}

module.exports = LeftNav;
