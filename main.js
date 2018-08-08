'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactDOM from 'react-dom';

var cultureIndex = 3;
var popIndex = 4;
var outputIndex = 5;
var chapterIndex = 0;

var BuildingData = {
  "Processed": false,
  "Residence": [[1, 2, 2, 0, 0, 31], [1, 2, 2, 3, 0, 4], [1, 2, 2, 4, 0, 5], [2, 2, 3, 12, 0, 28], [2, 2, 3, 11, 0, 10], // 5
  [2, 2, 3, 6, 0, 10], [2, 2, 3, 4, 0, 12], [3, 3, 3, 27, 0, 70], [3, 3, 3, 7, 0, 20], [3, 3, 3, 9, 0, 30], // 10
  [3, 3, 3, 7, 0, 40], [3, 3, 3, 6, 0, 40], [3, 3, 3, 7, 0, 40], [3, 3, 3, 8, 0, 40], [3, 3, 3, 7, 0, 50], // 15
  [6, 2, 4, 37, 0, 20], [6, 2, 4, 17, 0, 30], [7, 2, 4, 18, 0, 40], [7, 2, 4, 20, 0, 40], [8, 4, 3, 137, 0, 200], // 20
  [8, 4, 3, 35, 0, 150], [9, 4, 3, 46, 0, 190], [9, 4, 3, 47, 0, 110], [10, 3, 5, 181, 0, 450], [10, 3, 5, 68, 0, 170], // 25
  [11, 3, 5, 76, 0, 180], [11, 3, 5, 83, 0, 200], [12, 4, 4, 158, 0, 400], [12, 4, 4, 108, 0, 200]]
};

if (!BuildingData.Processed) {
  var data = BuildingData["Residence"];
  for (var i = 1; i < data.length; i++) {
    data[i][cultureIndex] += data[i - 1][cultureIndex];
    data[i][outputIndex] += data[i - 1][outputIndex];
  }
  BuildingData.Processed = true;
}

var WidgetRow = function (_React$Component) {
  _inherits(WidgetRow, _React$Component);

  function WidgetRow() {
    _classCallCheck(this, WidgetRow);

    return _possibleConstructorReturn(this, (WidgetRow.__proto__ || Object.getPrototypeOf(WidgetRow)).apply(this, arguments));
  }

  _createClass(WidgetRow, [{
    key: 'renderWidgets',
    value: function renderWidgets() {
      return this.props.components.map(function (name, i) {
        return React.createElement(Widget, { title: name });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'table',
        { 'class': 'widgetRow' },
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              { 'class': 'rowTitle', colSpan: '3' },
              React.createElement(
                'div',
                { 'class': 'rowTitle' },
                this.props.title
              )
            )
          ),
          React.createElement(
            'tr',
            null,
            this.renderWidgets()
          )
        )
      );
    }
  }]);

  return WidgetRow;
}(React.Component);

var Widget = function (_React$Component2) {
  _inherits(Widget, _React$Component2);

  function Widget(props) {
    _classCallCheck(this, Widget);

    return _possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).call(this, props));
  }

  _createClass(Widget, [{
    key: 'renderBody',
    value: function renderBody() {
      var rows = [];
      if (this.props.title == "Residence") {
        var _data = BuildingData["Residence"];
        for (var _i = 0; _i < _data.length; _i++) {
          rows.push(React.createElement(
            'tr',
            null,
            React.createElement(
              'td',
              null,
              _data[_i][1],
              ' x ',
              _data[_i][2]
            ),
            React.createElement(
              'td',
              null,
              'Chapter ',
              _data[_i][chapterIndex]
            ),
            React.createElement(
              'td',
              null,
              _data[_i][cultureIndex],
              ' Culture'
            ),
            React.createElement(
              'td',
              null,
              _data[_i][outputIndex],
              ' Population'
            )
          ));
        }
      }
      return React.createElement(
        'table',
        null,
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            React.createElement(
              'th',
              null,
              'Size'
            ),
            React.createElement(
              'th',
              null,
              'Chapter'
            ),
            React.createElement(
              'th',
              null,
              'Culture Cost '
            ),
            React.createElement(
              'th',
              null,
              'Population Cost'
            )
          ),
          rows
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'td',
        null,
        React.createElement(
          'div',
          { 'class': 'widget' },
          this.props.title,
          this.renderBody()
        )
      );
    }
  }]);

  return Widget;
}(React.Component);

var MainWindow = function (_React$Component3) {
  _inherits(MainWindow, _React$Component3);

  function MainWindow() {
    _classCallCheck(this, MainWindow);

    return _possibleConstructorReturn(this, (MainWindow.__proto__ || Object.getPrototypeOf(MainWindow)).apply(this, arguments));
  }

  _createClass(MainWindow, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        { id: 'mainContent' },
        React.createElement(WidgetRow, { title: 'General', components: ['Residence', 'Workshop', 'Extra Culture'] }),
        React.createElement(WidgetRow, { title: 'Basic Goods', components: ['Marble', 'Steel', 'Planks'] })
      );
    }
  }]);

  return MainWindow;
}(React.Component);

var domContainer = document.querySelector('#mainContentContainer');
console.log("hello world");
ReactDOM.render(React.createElement(MainWindow, null), domContainer);