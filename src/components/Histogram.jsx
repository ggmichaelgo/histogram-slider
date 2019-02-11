import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

export default class Histogram extends React.Component {
  static propTypes = {
    tally: PropTypes.object.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props, context) {
    super(props, context);
    this.renderBar = this.renderBar.bind(this);
  }

  renderBar(key, index, maxValue) {
    const { tally } = this.props;
    const value = tally[key];
    const barWidth = 1 / (Object.keys(tally).length) * 100;
    const barHeight = (value + 2) / maxValue * 100;

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
    const { tally } = this.props;
    const maxValue = _.max(Object.values(tally));

    return (
      <div className='histogram-container'>
        <svg className='histogram-wrapper'>
          {
            Object.keys(tally).map((k, i) => this.renderBar(k, i, maxValue))
          }
        </svg>
      </div>
    );
  }
}
