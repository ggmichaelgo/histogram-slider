"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Histogram = _interopRequireDefault(require("./Histogram"));

var _Slider = _interopRequireDefault(require("./Slider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

require("../styles/HistogramSlider.scss");

var HistogramSlider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(HistogramSlider, _React$Component);

  function HistogramSlider(props, context) {
    var _this;

    _classCallCheck(this, HistogramSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HistogramSlider).call(this, props, context));
    _this.state = {
      handlePosition: props.defaultHandlePosition
    };
    _this.rerender = _this.rerender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onChange = _this.onChange.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getHandlePositions = _this.getHandlePositions.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(HistogramSlider, [{
    key: "rerender",
    value: function rerender() {
      // upon resizing, the slider needs to be re-rendered
      this.slider.rerender();
    }
  }, {
    key: "onChange",
    value: function onChange(handlePosition) {
      this.setState({
        handlePosition: handlePosition
      });
      var onChange = this.props.onChange;

      if (onChange) {
        onChange(handlePosition);
      }
    }
  }, {
    key: "getHandlePositions",
    value: function getHandlePositions() {
      return this.state.handlePosition;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var handlePosition = this.state.handlePosition;
      var _this$props = this.props,
          className = _this$props.className,
          tally = _this$props.tally;
      var containerClassName = (0, _classnames.default)('histogram-slider-container', className);
      return _react.default.createElement("div", {
        className: containerClassName
      }, _react.default.createElement(_Histogram.default, {
        tally: tally
      }), _react.default.createElement(_Slider.default, {
        ref: function ref(r) {
          return _this2.slider = r;
        },
        onChange: this.onChange,
        handlePosition: handlePosition
      }));
    }
  }]);

  return HistogramSlider;
}(_react.default.Component);

exports.default = HistogramSlider;
HistogramSlider.propTypes = {
  valueList: _propTypes.default.array.isRequired,
  className: _propTypes.default.string,
  onChange: _propTypes.default.func,
  defaultHandlePosition: _propTypes.default.array
};
HistogramSlider.defaultProps = {
  className: '',
  onChange: undefined,
  defaultHandlePosition: [0, 100],
  tally: {
    100000: 1,
    150000: 2,
    200000: 5,
    250000: 10,
    300000: 1
  }
};