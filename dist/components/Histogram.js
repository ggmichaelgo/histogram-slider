"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _underscore = _interopRequireDefault(require("underscore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var Histogram =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Histogram, _React$Component);

  _createClass(Histogram, null, [{
    key: "getHistogramList",
    value: function getHistogramList(valueList) {
      var histogramList = {};
      valueList.forEach(function (value) {
        if (histogramList[value] === undefined) {
          histogramList[value] = 0;
        }

        histogramList[value] += 1;
      });
      return histogramList;
    }
  }]);

  function Histogram(props, context) {
    var _this;

    _classCallCheck(this, Histogram);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Histogram).call(this, props, context));
    _this.renderBar = _this.renderBar.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    var valueList = _this.props.valueList;
    _this.histogramList = Histogram.getHistogramList(valueList);
    return _this;
  }

  _createClass(Histogram, [{
    key: "renderBar",
    value: function renderBar(value, index) {
      var valueList = this.props.valueList;

      var maxValue = _underscore.default.max(Object.values(this.histogramList));

      var barWidth = 1 / Object.keys(this.histogramList).length * 100;
      var barHeight = (value + 2) / maxValue * 100;
      return _react.default.createElement("g", {
        className: "bar",
        key: "bar-".concat(index)
      }, _react.default.createElement("rect", {
        width: "calc(".concat(barWidth + '%', " + 1px)"),
        height: barHeight + '%',
        x: barWidth * index + '%',
        y: 100 - barHeight + '%'
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "histogram-container"
      }, _react.default.createElement("svg", {
        className: "histogram-wrapper"
      }, Object.values(this.histogramList).map(function (e, i) {
        return _this2.renderBar(e, i);
      })));
    }
  }]);

  return Histogram;
}(_react.default.Component);

exports.default = Histogram;
Histogram.propTypes = {
  valueList: _propTypes.default.array.isRequired,
  className: _propTypes.default.string
};
Histogram.defaultProps = {
  className: ''
};