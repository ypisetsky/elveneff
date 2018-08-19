'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import Data from './data';
import Building from './building';
import {renderChapter} from './util';

class LeftNav extends React.Component {
  render() {
    const resOptions= [];
    const resData = new Building("Residence", "Elves");
    for (let i = resData.getMinLevel(); i <= resData.getMaxLevel(); i++) {
      resOptions.push(
        <option value={i} key={i}>
          Level {i} ({renderChapter(resData.getChapter(i))})
        </option>
      );
    }

    const wsOptions= [];
    const wsData = new Building("Workshop", "Elves");
    for (let i = wsData.getMinLevel(); i <= wsData.getMaxLevel(); i++) {
      wsOptions.push(
        <option value={i} key={i}>
          Level {i} ({renderChapter(wsData.getChapter(i))})
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
          {Data.Roads[i].Name}({renderChapter(Data.Roads[i].Chapter)})
        </option>
      );
    }

    const chapters = [];
    for(let i = 1; i <= 12; i++) {
      chapters.push(
        <option value={i} key={i}>Chapter {i} ({renderChapter(i)})</option>
      );
    }


    return <form>
      <b>Select Race</b>
      <br />
      <input type="radio" id="raceElves" name="race" value="Elves" checked={this.props.race == "Elves"}
        onChange={this.props.onChange} />
      <label for="raceElves">Elves</label>
      <br />
      <input type="radio" id="raceHumans" name="race" value="Humans" checked={this.props.race == "Humans"}
        onChange={this.props.onChange} />
      <label for="raceHumans">Humans</label>
      <br />
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
