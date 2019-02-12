import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';

export default class Histogram extends React.Component {
  static propTypes = {
    tally: PropTypes.object.isRequired,
    interval: PropTypes.number.isRequired,
    className: PropTypes.string
  };

  static defaultProps = {
    className: ''
  };

  constructor(props, context) {
    super(props, context);
    this.getMinMax(true);
    this.renderBar = this.renderBar.bind(this);
  }

  componentDidUpdate() {
    this.getMinMax(true);
  }

  getMinMax(update = false) {
    if (update === false && this.minValue !== undefined && this.maxValue !== undefined) {
      return {
        minKey: this.minKey,
        maxKey: this.maxKey,
        minValue: this.minValue,
        maxValue: this.maxValue
      };
    }

    const { tally } = this.props;
    const keyList = Object.keys(tally).map(e => parseInt(e));
    this.minKey = Math.min(...keyList);
    this.maxKey = Math.max(...keyList);
    this.minValue = tally[this.minKey];
    this.maxValue = tally[this.maxKey];

    return {
      minKey: this.minKey,
      maxKey: this.maxKey,
      minValue: this.minValue,
      maxValue: this.maxValue
    };
  }

  renderBar(key, value) {
    const { interval } = this.props;
    const { maxKey, minValue, maxValue } = this.getMinMax();
    const barWidth = this.props.interval;
    const barHeight = (value + 30) / maxValue * 100;

    return (
      <g className="bar" key={`bar-${key}`}>
        <rect
          width={`${interval}%`}
          height={barHeight + '%'}
          x={(key / maxKey * 100) + '%'}
          y={(100 - barHeight) + '%'}
        />
      </g>
    );
  }

  renderBarList() {
    const { tally, interval } = this.props;
    const barList = [];
    const { minKey, maxKey } = this.getMinMax();

    let index = minKey;
    const keyList = Object.keys(tally).map(e => parseInt(e)).sort((a, b) => a - b);
    const newTally = {};

    while (index < maxKey) {
      let sum = 0;

      while(keyList.length > 0) {
        if (keyList[0] >= index + interval) {
          break;
        }

        const key = keyList.shift();
        sum += tally[key];
      }

      if (sum > 0) {
        barList.push(
          this.renderBar(index, sum)
        );
      }

      index += interval;
    }

    return barList;
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { tally } = this.props;
    const shouldUpdate = tally !== nextProps.tally;
    return shouldUpdate;
  }

  render() {
    const { tally } = this.props;
    const maxValue = _.max(Object.values(tally));

    return (
      <div className='histogram-container'>
        <svg className='histogram-wrapper'>
          {
            this.renderBarList()
          }
        </svg>
      </div>
    );
  }
}
