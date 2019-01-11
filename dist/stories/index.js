"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _addonActions = require("@storybook/addon-actions");

var _addonLinks = require("@storybook/addon-links");

var _demo = require("@storybook/react/demo");

var _HistogramSlider = _interopRequireDefault(require("../components/HistogramSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var histogramSliderStory = (0, _react2.storiesOf)('HistogramSlider', module);
histogramSliderStory.add('Default', function () {
  return _react.default.createElement("div", {
    style: {
      padding: 50
    }
  }, _react.default.createElement(_HistogramSlider.default, {
    valueList: [1, 1, 1, 1, 2, 2, 3, 3, 3, 4, 5, 6, 7, 8, 8, 8, 8, 8, 8, 11, 11, 11, 12, 12, 13, 13, 13, 14, 15, 16, 17, 18, 18, 18, 18, 18, 18, 21, 21, 21, 22, 22, 23, 23, 23, 24, 25, 26, 27, 28, 28, 28, 28, 28, 28],
    defaultHandlePosition: [10, 50],
    onChange: function onChange(handlePosition) {
      console.log('new handle positions', handlePosition);
    }
  }));
});