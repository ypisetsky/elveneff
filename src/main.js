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
        <Widget title={this.state.selectedBuilding} cultureDensity={this.props.cultureDensity} residenceLevel={this.props.residenceLevel} workshopLevel="18" />
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
    };
  }

  render() {
    return <div id="mainContent">
      <table className="widgetRow">
        <tbody>
          <tr>
            <WidgetOrSelectorContainer key="left" cultureDensity={this.state.cultureDensity} residenceLevel={this.state.residenceLevel} />
            <WidgetOrSelectorContainer key="right" cultureDensity={this.state.cultureDensity} residenceLevel={this.state.residenceLevel} />
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
    this.state = {cultureDensity: 100, wsTime: 180, residenceLevel: 18 }; // really level 19, but 0 indexing
  }
  render() {
    const cultureDensityText = <input type="text" size="5" value={this.state.cultureDensity} onChange={(event) => this.setState({cultureDensity: event.target.value})}/>;


    const resOptions= [];
    const resData = Data.BuildingData["Residence"];
    for (let i = 0; i < resData.length; i++) {
      resOptions.push(
        <option selected={i == this.state.residenceLevel} value={i} key={i}>
          Level {i+1} ({Data.renderChapter(resData[i][0])})
        </option>
      );
    }

    const wsOptions = [];
    const wsProductionData = Data.BuildingMeta.Workshop.Production;
    for (let minutes in wsProductionData) {
      wsOptions.push(
        <option selected={minutes == this.state.workshopTime} value={minutes} key={minutes}>
          {Data.renderTime(minutes)}
        </option>
      );
    }
    return <form>
      Culture Density: {cultureDensityText}
      <br />
      Residence Level:
      <select onChange={(event) => this.setState({residenceLevel: event.target.value})}>
        {resOptions}
      </select>
      <br />
      Workshop production time:
      <select onChange={(event) => this.setState({workshopTime: event.target.value})}>
        {wsOptions}
      </select>
    </form>
  }

  componentDidUpdate() {
    console.log(this.state);
    this.props.mainWindow.setState(this.state);
  }
}

const window = ReactDOM.render(<MainWindow />, mainDomContainer);

const leftDomContainer = document.querySelector("#leftBar");
ReactDOM.render(<LeftNav mainWindow={window} />, leftDomContainer);
