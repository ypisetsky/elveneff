'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

import Data from './data';
import Widget from './widget';
import ResidenceCultureChecker from './rescult';
import LeftNav from './left';

console.log(Data.BuildingData);


class WidgetOrSelectorContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedBuilding: "Residence"};
  }
  render() {
    if (!this.state.selectedBuilding) {
      return this.renderSelector();
    } else if (this.state.selectedBuilding == "rescult"){
      return <ResidenceCultureChecker
        cultureDensity={this.props.cultureDensity}
        residenceLevel={this.props.residenceLevel}
        streetCulture={this.props.streetCulture}
        />
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
      <option value="rescult">Residence/Culture Calculator</option>
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

class ElvenarCalculator extends React.Component {
  render() {
    const window = <MainWindow />;
    const left = <LeftNav mainWindow={window} />;
    return <div>
      <div id="leftBar">
        {left}
      </div>
      <div id="mainContentContainer">
        {window}
      </div>
    </div>;
  }
}
ReactDOM.render(<ElvenarCalculator />, document.querySelector("#reactRoot"));
