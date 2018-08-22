'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import Data from './data';
import Building from './building';
import {renderChapter} from './util';

class LeftNav extends React.Component {
  render() {
    const resOptions= [];
    const resData = Building("Residence", "Elves");
    for (let i = resData.getMinLevel(); i <= resData.getMaxLevel(); i++) {
      resOptions.push(
        <option value={i} key={i}>
          Level {i} ({renderChapter(resData.getChapter(i))})
        </option>
      );
    }

    const wsOptions= [];
    const wsData = Building("Workshop", "Elves");
    for (let i = wsData.getMinLevel(); i <= wsData.getMaxLevel(); i++) {
      wsOptions.push(
        <option value={i} key={i}>
          Level {i} ({renderChapter(wsData.getChapter(i))})
        </option>
      );
    }

    const collectOpts = [];
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


    const top = <form>
      <b>Select Race</b>
      <br />
      <input type="radio" id="raceElves" name="race" value="Elves" checked={this.props.race == "Elves"}
        onChange={this.props.onChange} />
      <label htmlFor="raceElves">Elves</label>
      <br />
      <input type="radio" id="raceHumans" name="race" value="Humans" checked={this.props.race == "Humans"}
        onChange={this.props.onChange} />
      <label htmlFor="raceHumans">Humans</label>
      <br />
      <b>Select Chapter</b>
      <select onChange={this.props.onChapterSelect} defaultValue="">
        <option value="">--- Select a Chapter ---</option>
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
      <hr />
    </form>;
    return <div>
      {top}
      <b><button onClick={this.props.toggleHelp}>Help</button></b>
      <div className="footer">
        Yuliy Pisetsky © 2018. This site is not affiliated or associated with InnoGames or Elvenar in any way. All original images are copyright to their respective owners and no copyright infringement is intended.
      </div>
    </div>
  }
}

module.exports = LeftNav;
