"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

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

var Slider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Slider, _React$Component);

  function Slider(props, context) {
    var _this;

    _classCallCheck(this, Slider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Slider).call(this, props, context));
    _this.state = {
      draggingTarget: undefined
    };
    _this.onMouseUp = _this.onMouseUp.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onMouseDown = _this.onMouseDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.onMouseMove = _this.onMouseMove.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.getMousePosition = _this.getMousePosition.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.rerender = _this.rerender.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Slider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      window.addEventListener("mouseup", this.onMouseUp, false);
      this.updateActiveTrack();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("mouseup", this.onMouseUp, false);
    }
  }, {
    key: "getMousePosition",
    value: function getMousePosition(event) {
      var CTM = this.container.getScreenCTM();

      if (event.touches) {
        event = event.touches[0];
      }

      return (event.clientX - CTM.e) / CTM.a;
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp() {
      window.removeEventListener('mousemove', this.onMouseMove, false);
      this.setState({
        draggingTarget: undefined
      });
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(e) {
      var draggingTarget = e.target;
      window.addEventListener('mousemove', this.onMouseMove, false);
      this.setState({
        draggingTarget: draggingTarget
      });
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove(e) {
      e.preventDefault();
      var draggingTarget = this.state.draggingTarget;

      if (!draggingTarget) {
        return;
      }

      var trackWidth = this.trackBackground.width.baseVal.value;
      var pos = this.getMousePosition(e);
      var offset = draggingTarget === this.leftHandle ? -12.5 : 12.5;
      var newHandlePosition = (pos + offset) / trackWidth * 100;

      if (draggingTarget === this.rightHandle) {
        var leftHandlePos = this.leftHandle.x.baseVal.value;

        if (leftHandlePos + 50 >= pos) {
          // prevent collision with left handle
          newHandlePosition = (leftHandlePos + 50) / trackWidth * 100;
        }

        if ((pos + 12.5) / trackWidth > 1) {
          // prevent handle going off track
          newHandlePosition = 100;
        }
      } else if (draggingTarget === this.leftHandle) {
        var rightHandlePos = this.rightHandle.x.baseVal.value;

        if (rightHandlePos - 12.5 < pos) {
          // prevent collision with right handle
          newHandlePosition = (rightHandlePos - 25) / trackWidth * 100;
        }

        if (newHandlePosition <= 0) {
          // prevent handle going off track
          newHandlePosition = 0;
        }
      }

      var handlePosition = Object.assign([], this.props.handlePosition);

      if (draggingTarget === this.leftHandle) {
        handlePosition[0] = newHandlePosition;
      } else {
        handlePosition[1] = newHandlePosition;
      }

      if (this.props.onChange) {
        this.props.onChange(handlePosition);
      }

      this.updateActiveTrack();
    }
  }, {
    key: "updateActiveTrack",
    value: function updateActiveTrack() {
      var handlePosition = this.props.handlePosition;
      var width = handlePosition[1] - handlePosition[0];
      var trackWidth = this.container.parentNode.offsetWidth;
      this.activeTrack.setAttributeNS(null, 'x', "calc(".concat(handlePosition[0], "% + 12.5px)"));
      this.activeTrack.setAttributeNS(null, 'width', "".concat(trackWidth * (width / 100) - 25));
    }
  }, {
    key: "rerender",
    value: function rerender() {
      var handlePosition = Object.assign([], this.props.handlePosition);
      handlePosition[0] = Math.round(handlePosition[0] * 100) / 100;
      handlePosition[1] = Math.round(handlePosition[1] * 100) / 100;
      this.updateActiveTrack();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var handlePosition = this.props.handlePosition;
      var trackWidth = this.trackBackground ? this.trackBackground.width.baseVal.value : false;
      return _react.default.createElement("svg", {
        className: "slider-container",
        ref: function ref(r) {
          return _this2.container = r;
        },
        onClick: this.rerender
      }, _react.default.createElement("rect", {
        ref: function ref(r) {
          return _this2.trackBackground = r;
        },
        className: "track-background",
        width: "100%",
        rx: '5px'
      }), _react.default.createElement("rect", {
        ref: function ref(r) {
          return _this2.activeTrack = r;
        },
        className: "active-track",
        x: "12.5px",
        width: "100%"
      }), _react.default.createElement("rect", {
        ref: function ref(r) {
          return _this2.leftHandle = r;
        },
        className: "handle left-handle",
        onMouseDown: this.onMouseDown,
        x: handlePosition[0] + '%'
      }), _react.default.createElement("rect", {
        ref: function ref(r) {
          return _this2.rightHandle = r;
        },
        className: "handle right-handle",
        onMouseDown: this.onMouseDown,
        x: trackWidth ? trackWidth * (handlePosition[1] / 100) - 25 : "calc(".concat(handlePosition[1], "% - 25px)")
      }));
    }
  }]);

  return Slider;
}(_react.default.Component);

exports.default = Slider;
Slider.propTypes = {
  handlePosition: _propTypes.default.array,
  onChange: _propTypes.default.func
};
Slider.defaultProps = {
  handlePosition: [0, 100],
  onChange: undefined
};