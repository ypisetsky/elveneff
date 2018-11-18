'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Data from './data';
import DataInit from './datainit';
import Building from './building';
import Widget from './widget';
import ResidenceCultureChecker from './rescult';
import LeftNav from './left';
import HelpWindow from './help';

class WidgetOrSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedBuilding: props.defaultBuilding};
  }
  render() {
    let child = undefined;
    if (this.state.selectedBuilding == "rescult"){
      child = <ResidenceCultureChecker
        cultureDensity={this.props.cultureDensity}
        residenceLevel={this.props.residenceLevel}
        streetCulture={this.props.streetCulture}
        relicBoost={this.props.relicBoost}
        race={this.props.race}
        collectCount={this.props.collectCount} />;
    } else if (this.state.selectedBuilding){
      child = <Widget
        title={this.state.selectedBuilding}
        cultureDensity={this.props.cultureDensity}
        residenceLevel={this.props.residenceLevel}
        streetCulture={this.props.streetCulture}
        relicBoost={this.props.relicBoost}
        race={this.props.race}
        workshopLevel={this.props.workshopLevel}
        collectCount={this.props.collectCount} />;
    }
    const buildings = [];
    for (var name in Data.BuildingMeta) {
      buildings.push(<option value={name} key={name}>{name}</option>);
    }
    return <td>
      <select onChange={(event) => { if (event.target.value) this.setState({selectedBuilding: event.target.value})} }>
        <option value={null}>Select a Building</option>
        <option value="rescult">Event/Custom Building Calculator</option>
        {buildings}
      </select>
      <br />
      {child}
    </td>;
  }

}


class MainWindow extends React.Component {
  render() {
    let body;
    if (this.props.help) {
      body = <HelpWindow toggleHelp={this.props.toggleHelp}/>;
    } else {
      body = <table className="widgetRow">
        <tbody>
          <tr>
            <WidgetOrSelectorContainer key="left"
              defaultBuilding={"Residence"}
              cultureDensity={this.props.cultureDensity}
              residenceLevel={this.props.residenceLevel}
              workshopLevel={this.props.workshopLevel}
              collectCount={this.props.collectCount}
              relicBoost={this.props.relicBoost}
              race={this.props.race}
              streetCulture={this.props.streetCulture} />
            <WidgetOrSelectorContainer key="right"
              defaultBuilding={"Workshop"}
              cultureDensity={this.props.cultureDensity}
              residenceLevel={this.props.residenceLevel}
              workshopLevel={this.props.workshopLevel}
              collectCount={this.props.collectCount}
              relicBoost={this.props.relicBoost}
              race={this.props.race}
              streetCulture={this.props.streetCulture} />
          </tr>
        </tbody>
      </table>;
    }
    return <div id="mainContent">
      {body}
    </div>;
  }
}

class ElvenarCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cultureDensity: 100,
      collectCount: 3,
      residenceLevel: 18, // really level 19, but 0 indexing
      workshopLevel: 18,
      streetCulture: 49,
      relicBoost: 700,
      race: "Elves",
      showHelp: true,
    };
    this.quickSelect = this.quickSelect.bind(this);
    this.setProp = this.setProp.bind(this);
    this.toggleHelp = this.toggleHelp.bind(this);
  }

  render() {
    const window = <MainWindow
      help={this.state.showHelp}
      toggleHelp={this.toggleHelp}
      cultureDensity={this.state.cultureDensity}
      residenceLevel={this.state.residenceLevel}
      workshopLevel={this.state.workshopLevel}
      collectCount={this.state.collectCount}
      streetCulture={this.state.streetCulture}
      relicBoost={this.state.relicBoost}
      race={this.state.race}
    />;
    const left = <LeftNav parent={this}
      cultureDensity={this.state.cultureDensity}
      residenceLevel={this.state.residenceLevel}
      workshopLevel={this.state.workshopLevel}
      collectCount={this.state.collectCount}
      streetCulture={this.state.streetCulture}
      relicBoost={this.state.relicBoost}
      race={this.state.race}
      onChapterSelect={this.quickSelect}
      onChange={this.setProp}
      toggleHelp={this.toggleHelp}
    />;
    return <div>
      <div id="leftBar">
        {left}
      </div>
      <div id="mainContentContainer">
        {window}
      </div>
    </div>;
  }

  quickSelect(event) {
    if (!event.target.value) {
      return;
    }
    const chapter = parseInt(event.target.value);
    const res = Building("Residence", "Elves");
    for (let i = res.getMaxLevel(); i >= res.getMinLevel(); i--) {
      if (res.getChapter(i) <= chapter) {
        this.setState({residenceLevel: i});
        break;
      }
    }
    const ws = Building("Workshop", "Elves");
    for (let i = ws.getMaxLevel(); i >= ws.getMinLevel(); i--) {
      if (ws.getChapter(i) <= chapter) {
        this.setState({workshopLevel: i});
        break;
      }
    }
    let best = 0;
    for (let streetCulture in Data.Roads) {
      if (parseInt(Data.Roads[streetCulture].Chapter) <= chapter && parseInt(streetCulture) > best) {
        best = parseInt(streetCulture);
      } else {
        console.log(Data.Roads[streetCulture].Chapter, chapter, best, streetCulture, "not best");
      }
    }
    console.log(Data.Roads, best, chapter);
    this.setState({streetCulture: best});
    let cultureDensity = 145;
    let relicBoost = 700;
    switch (chapter) {
      // In most cases, I use an item actually in the last row of techs from
      // the previous age
      case 1:
        cultureDensity = 22; // Luminous Signpost
        relicBoost = 100;
        break;
      case 2:
        cultureDensity = 28; // Flying Boat (I)
        relicBoost = 140;
        break;
      case 3:
        cultureDensity = 33; // Spot of Whispering Trees (II)
        relicBoost = 260;
        break;
      case 4:
        cultureDensity = 49; // Mysterious Cyclone (III)
        relicBoost = 340;
        break;
      case 5:
        cultureDensity = 60; // Temple of Ages (IV)
        relicBoost = 470;
        break;
      case 6:
        cultureDensity = 85; // Ancient Grounds (halfway through)
        relicBoost = 560;
        break;
      case 7:
        cultureDensity = 96; // Temple of the Holy Fire (Dwarves)
        relicBoost = 580;
        break;
      case 8:
        cultureDensity = 123; // Pond of Recreation (Fairies); Diabhal's is only slightly higher
        relicBoost = 650;
        break;
      case 9:
        cultureDensity = 145; // Campfire BBQ (Orcs)
        break;
      case 10:
        // This is where it gets weird. Many buildings also produce mana, but you can use them
        // purely as culture. For instance Autumn's Greetings is 190 culture per tile, but it
        // is quite hard to spam them due to time to build + cost. I pick something a bit lower
        // but the pattern is clear: we start skyrocketing here.
        cultureDensity = 170;
        break;
      case 11:
        // Chess pieces are 263. Mana fountain is 213. Serious fudge factor territory here
        // until I figure out what to do with mana production.
        cultureDensity = 250;
        break;
      case 12:
        cultureDensity = 340; // Pole of Donations (Halflings)
        break;
      case 13:
        cultureDensity = 430; // Cafe masquerade (Elementals)
        break;
    }
    this.setState({cultureDensity, relicBoost});
  }

  setProp(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  toggleHelp(event) {
    this.setState({showHelp: !this.state.showHelp});
  }
}
ReactDOM.render(<ElvenarCalculator />, document.querySelector("#reactRoot"));
