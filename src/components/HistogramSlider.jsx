import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Histogram from './Histogram';
import Slider from './Slider';

require('../styles/HistogramSlider.scss');

export default class HistogramSlider extends React.Component {
  static propTypes = {
    tally: PropTypes.object.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    defaultHandlePosition: PropTypes.array
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
    }
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      handlePosition: props.defaultHandlePosition
    }

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

  render() {
    const { handlePosition } = this.state;
    const { className, tally } = this.props;
    const containerClassName = classNames(
      'histogram-slider-container',
      className
    );

    return (
      <div className={containerClassName}>
        <Histogram tally={tally} />
        <Slider
          ref={r => (this.slider = r)}
          onChange={this.onChange}
          handlePosition={handlePosition}
        />
      </div>
    );
  }
}
