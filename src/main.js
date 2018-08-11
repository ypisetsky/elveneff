'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Data from './data';
import Widget from './widget';

console.log(Data.BuildingData);


class WidgetOrSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedBuilding: "Residence"};
  }
  render() {
    if (!this.state.selectedBuilding) {
      return this.renderSelector();
    } else {
      return <td>
        <button onClick={() => this.setState({selectedBuilding: null})}>Select Another Building</button>
        <br />
        <Widget 
          title={this.state.selectedBuilding} 
          cultureDensity={this.props.cultureDensity} 
          residenceLevel={this.props.residenceLevel} 
          streetCulture={this.props.streetCulture}
          workshopLevel={18}
          collectCount={this.props.collectCount} />
      </td>;
    }
  }

  renderSelector() {
    const buildings = [];
    for (var name in Data.BuildingMeta) {
      buildings.push(<option value={name}>{name}</option>);
    }
    return <td className="widget"><select onChange={(event) => this.setState({selectedBuilding: event.target.value})}>
      <option value={null}>Select a Building</option>
      {buildings}
    </select></td>;
  }
}


class MainWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cultureDensity: 100,
      residenceLevel: 18,
      collectCount: 3,
      streetCulture: 49,
    };
  }

  render() {
    return <div id="mainContent">
      <table className="widgetRow">
        <tbody>
          <tr>
            <WidgetOrSelectorContainer key="left" cultureDensity={this.state.cultureDensity} residenceLevel={this.state.residenceLevel} collectCount={this.state.collectCount} streetCulture={this.state.streetCulture} />
            <WidgetOrSelectorContainer key="right" cultureDensity={this.state.cultureDensity} residenceLevel={this.state.residenceLevel} collectCount={this.state.collectCount} streetCulture={this.state.streetCulture} />
          </tr>
        </tbody>
      </table>
    </div>;
  }

  updateCultureDensity(newDensity) {
    this.setState({
      cultureDensity: newDensity,
    });
  }
}

const mainDomContainer = document.querySelector('#mainContentContainer');

class LeftNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cultureDensity: 100, 
      collectCount: 3, 
      residenceLevel: 18, // really level 19, but 0 indexing
      streetCulture: 49,
    };
    this.setResidenceLevel = this.setResidenceLevel.bind(this);
    this.setWorkshopLevel = this.setWorkshopLevel.bind(this);
    this.setCollectCount = this.setCollectCount.bind(this);
    this.setCultureDensity = this.setCultureDensity.bind(this);
    this.setStreetCulture = this.setStreetCulture.bind(this);
    this.quickSelect = this.quickSelect.bind(this);
  }

  setResidenceLevel(event) {
    this.setState({residenceLevel: event.target.value});
  }

  setWorkshopLevel(event) {
    this.setState({workshopLevel: event.target.value});
  }

  setCollectCount(event) {
    this.setState({collectCount: event.target.value});
  }

  setCultureDensity(event) {
    this.setState({cultureDensity: event.target.value});
  }

  setStreetCulture(event) {
    this.setState({streetCulture: event.target.value});
  }

  render() {
    const cultureDensityText = <input type="text" size="5" value={this.state.cultureDensity} onChange={this.setCultureDensity}/>;


    const resOptions= [];
    const resData = Data.BuildingData["Residence"];
    for (let i = 0; i < resData.length; i++) {
      resOptions.push(
        <option selected={i == this.state.residenceLevel} value={i} key={i}>
          Level {i+1} ({Data.renderChapter(resData[i][0])})
        </option>
      );
    }

    const collectOpts = [];
    console.log(Data.CollectionOptions);
    for (let i in Data.CollectionOptions) {
      collectOpts.push(
        <option selected={i == this.state.collectCount} value={i} key={i}>
          {Data.CollectionOptions[i].Description}
        </option>
      );
    }

    const streetOpts = [];
    for (let i in Data.Roads) {
      streetOpts.push(
        <option selected={i == this.state.streetCulture} value={i} key={i}>
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
      <select onChange={this.quickSelect}>
        <option value={null} selected={true}>--- Select a Chapter ---</option>
        {chapters}
      </select>
      <br />
      <b>Daily Collections</b>:
      <select onChange={this.setCollectCount}>
        {collectOpts}
      </select>
      <hr />
      <b>Specific parameters</b>
      <br />
      Culture Density: {cultureDensityText}
      <br />
      Residence Level:
      <select onChange={this.setResidenceLevel}>
        {resOptions}
      </select>
      <br />
      Workshop Level:
      <select onChange={this.setWorkshopLevel}>
        {resOptions}
      </select>
      <br />
      Streets: <select onChange={this.setStreetCulture}>
        {streetOpts}
      </select>
    </form>;
  }

  // Finds the highest level building
  quickSelect(event) {
    if (!event.target.value) {
      return;
    }
    const chapter = event.target.value ;
    for (let i = Data.BuildingData.Residence.length - 1; i >= 0; i--) {
      if (Data.BuildingData.Residence[i][0] <= chapter) {
        this.setState({residenceLevel: i});
        break;
      }
    }
    for (let i = Data.BuildingData.Workshop.length - 1; i >= 0; i--) {
      if (Data.BuildingData.Workshop[i][0] <= chapter) {
        this.setState({workshopLevel: i});
        break;
      }
    }
    let cultureDensity = 145;
    switch (parseInt(chapter)) {
      // In most cases, I use an item actually in the last row of techs from
      // the previous age
      case 1:
        cultureDensity = 22; // Luminous Signpost
        break;
      case 2:
        cultureDensity = 28; // Flying Boat (I)
        break;
      case 3:
        cultureDensity = 33; // Spot of Whispering Trees (II)
        break;
      case 4:
        cultureDensity = 49; // Mysterious Cyclone (III)
        break;
      case 5:
        cultureDensity = 60; // Temple of Ages (IV)
        break;
      case 6:
        cultureDensity = 85; // Ancient Grounds (halfway through)
        break;
      case 7:
        cultureDensity = 96; // Temple of the Holy Fire (Dwarves)
        break;
      case 8:
        cultureDensity = 123; // Pond of Recreation (Fairies); Diabhal's is only slightly higher
        break;
      case 9:
        cultureDensity = 145; // Campfire BBQ (Orcs)
        break;
      default:
        cultureDensity = 145;
        break;
    }
    console.log(chapter, cultureDensity);
    this.setState({cultureDensity: cultureDensity});
  }



  componentDidUpdate() {
    console.log(this.state);
    this.props.mainWindow.setState(this.state);
  }
}

const window = ReactDOM.render(<MainWindow />, mainDomContainer);

const leftDomContainer = document.querySelector("#leftBar");
ReactDOM.render(<LeftNav mainWindow={window} />, leftDomContainer);
