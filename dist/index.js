"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Histogram", {
  enumerable: true,
  get: function get() {
    return _Histogram.default;
  }
});
Object.defineProperty(exports, "HistogramSlider", {
  enumerable: true,
  get: function get() {
    return _HistogramSlider.default;
  }
});
exports.default = void 0;

var _Histogram = _interopRequireDefault(require("./components/Histogram"));

var _HistogramSlider = _interopRequireDefault(require("./components/HistogramSlider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = _HistogramSlider.default;
exports.default = _default;