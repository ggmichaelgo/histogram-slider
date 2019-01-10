import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

export default class Histogram extends React.Component {
  static propTypes = {
    valueList: PropTypes.array.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  static getHistogramList(valueList) {
    const histogramList = {};

    valueList.forEach((value) => {
      if (histogramList[value] === undefined) {
        histogramList[value] = 0;
      }

      histogramList[value] += 1;
    });

    return histogramList;
  }

  constructor(props, context) {
    super(props, context);
    this.renderBar = this.renderBar.bind(this);

    const { valueList } = this.props;
    this.histogramList = Histogram.getHistogramList(valueList);
  }

  renderBar(value, index) {
    const { valueList } = this.props;
    const maxValue = _.max(Object.values(this.histogramList));
    const barWidth = 1 / (Object.keys(this.histogramList).length) * 100;
    const barHeight = (value / maxValue) * 100;

    return (
      <g className="bar" key={`bar-${index}`}>
        <rect
          width={`calc(${barWidth + '%'} + 1px)`}
          height={barHeight + '%'}
          x={(barWidth * index) + '%'}
          y={(100 - barHeight) + '%'}
        />
      </g>
    );
  }

  render() {
    return (
      <div className='histogram-container'>
        <svg className='histogram-wrapper'>
          {
            Object.values(this.histogramList).map((e, i) => this.renderBar(e, i))
          }
        </svg>
      </div>
    );
  }
}
