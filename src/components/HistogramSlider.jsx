import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Histogram from './Histogram';
import Slider from './Slider';

require('../styles/HistogramSlider.scss');

export default class HistogramSlider extends React.Component {
  static propTypes = {
    tally: PropTypes.object.isRequired,
    interval: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func,
    defaultHandlePosition: PropTypes.array,
    unit: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
  };

  static defaultProps = {
    className: '',
    onChange: undefined,
    defaultHandlePosition: [0, 100],
    tally: {
      100000: 1,
      150000: 2,
      200000: 5,
      250000: 10,
      300000: 1
    },
    interval: 20,
    unit: ''
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      handlePosition: props.defaultHandlePosition
    }

    const keyList = Object.keys(props.tally).map(e => parseInt(e));
    this.minValue = Math.min(...keyList);
    this.maxValue = Math.max(...keyList);

    this.format = this.format.bind(this);
    this.rerender = this.rerender.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getHandlePositions = this.getHandlePositions.bind(this);
  }

  rerender() {
    // upon resizing, the slider needs to be re-rendered
    this.slider.rerender();
  }

  onChange(handlePosition) {
    this.setState({ handlePosition });

    const { onChange } = this.props;

    if (onChange) {
      onChange(handlePosition);
    }
  }

  getHandlePositions() {
    return this.state.handlePosition;
  }

  format(value) {
    const nativeValue = (this.maxValue - this.minValue) * (value / 100.0);
    return parseInt(nativeValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  render() {
    const { handlePosition } = this.state;
    const { className, tally, unit, interval } = this.props;
    const containerClassName = classNames(
      'histogram-slider-wrapper',
      className
    );

    return (
      <div className={containerClassName}>
        <div className="histogram-slider-container">
          <Histogram tally={tally} interval={interval} />
          <Slider
            ref={r => (this.slider = r)}
            onChange={this.onChange}
            handlePosition={handlePosition}
          />
        </div>
        <div className="label-container">
          {
            parseInt(handlePosition[0]) === 0 ?
              <label>No min</label>
              :
              <label>{this.format(handlePosition[0])}<span>{unit}</span></label>
          }
          {
            parseInt(handlePosition[1]) === 100 ?
              <label>No max</label>
              :
              <label>{this.format(handlePosition[1])}<span>{unit}</span></label>
          }
        </div>
      </div>
    );
  }
}
