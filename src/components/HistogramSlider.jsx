import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Histogram from './Histogram';
import Slider from './Slider';

require('../styles/HistogramSlider.scss');

export default class HistogramSlider extends React.Component {
  static propTypes = {
    valueList: PropTypes.array.isRequired,
    className: PropTypes.string,
    onChange: PropTypes.func,
    defaultHandlePosition: PropTypes.array
  };

  static defaultProps = {
    className: '',
    onChange: undefined,
    defaultHandlePosition: [0, 100],
    valueList: [1,1,1,1,2,2,3,3,3,4,5,6,7,8,8,8,8,8,8]
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      handlePosition: props.defaultHandlePosition
    }

    this.rerender = this.rerender.bind(this);
    this.onChange = this.onChange.bind(this);
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

  render() {
    const { handlePosition } = this.state;
    const { className, valueList } = this.props;
    const containerClassName = classNames(
      'histogram-slider-container',
      className
    );

    return (
      <div className={containerClassName}>
        <Histogram valueList={valueList} />
        <Slider
          ref={r => (this.slider = r)}
          onChange={this.onChange}
          handlePosition={handlePosition}
        />
      </div>
    );
  }
}
