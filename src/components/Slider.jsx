import React from 'react';
import PropTypes from 'prop-types';

export default class Slider extends React.Component {
  static propTypes = {
    handlePosition: PropTypes.array,
    onChange: PropTypes.func
  };

  static defaultProps = {
    handlePosition: [0, 100],
    onChange: undefined
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      draggingTarget: undefined
    };

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.getMousePosition = this.getMousePosition.bind(this);
    this.rerender = this.rerender.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.onMouseUp, false);
    this.updateActiveTrack();
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onMouseUp, false);
  }

  getMousePosition(event) {
    const CTM = this.container.getScreenCTM();

    if (event.touches) {
      event = event.touches[0];
    }

    return (event.clientX - CTM.e) / CTM.a;
  }

  onMouseUp() {
    window.removeEventListener('mousemove', this.onMouseMove, false);

    this.setState({
      draggingTarget: undefined
    });
  }

  onMouseDown(e) {
    const draggingTarget = e.target;

    window.addEventListener('mousemove', this.onMouseMove, false);
    this.setState({ draggingTarget });
  }

  onMouseMove(e) {
    e.preventDefault();

    const { draggingTarget } = this.state;

    if (!draggingTarget) {
      return;
    }

    const trackWidth = this.trackBackground.width.baseVal.value;
    const pos = this.getMousePosition(e);
    const offset = draggingTarget === this.leftHandle ? -12.5 : 12.5;

    let newHandlePosition = (pos + offset) / trackWidth * 100;

    if (draggingTarget === this.rightHandle) {
      const leftHandlePos = this.leftHandle.x.baseVal.value;

      if (leftHandlePos + 50 >= pos) {
        // prevent collision with left handle
        newHandlePosition = (leftHandlePos + 50) / trackWidth * 100;
      }

      if ((pos + 12.5) / trackWidth > 1) {
        // prevent handle going off track
        newHandlePosition = 100;
      }
    } else if (draggingTarget === this.leftHandle) {
      const rightHandlePos = this.rightHandle.x.baseVal.value;

      if (rightHandlePos - 12.5 < pos) {
        // prevent collision with right handle
        newHandlePosition = (rightHandlePos - 25) / trackWidth * 100;
      }

      if (newHandlePosition <= 0) {
        // prevent handle going off track
        newHandlePosition = 0;
      }
    }

    const handlePosition = Object.assign([], this.props.handlePosition);

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

  updateActiveTrack() {
    const { handlePosition } = this.props;
    const width = handlePosition[1] - handlePosition[0];
    const trackWidth = this.container.parentNode.offsetWidth;

    this.activeTrack.setAttributeNS(null, 'x', `calc(${handlePosition[0]}% + 12.5px)`);
    this.activeTrack.setAttributeNS(null, 'width', `${trackWidth * (width / 100) - 25}`);
  }

  rerender() {
    const handlePosition = Object.assign([], this.props.handlePosition);
    handlePosition[0] = Math.round(handlePosition[0] * 100) / 100;
    handlePosition[1] = Math.round(handlePosition[1] * 100) / 100;
    this.updateActiveTrack();
  }

  render() {
    const { handlePosition } = this.props;
    const trackWidth = this.trackBackground ? this.trackBackground.width.baseVal.value : false;

    return (
      <svg
        className="slider-container"
        ref={r => (this.container = r)}
        onClick={this.rerender}
      >
        <rect
          ref={r => (this.trackBackground = r)}
          className="track-background"
          width="100%"
          rx={'5px'}
        />
        <rect
          ref={r => (this.activeTrack = r)}
          className="active-track"
          x="12.5px"
          width="100%"
        />
        <rect
          ref={r => (this.leftHandle = r)}
          className="handle left-handle"
          onMouseDown={this.onMouseDown}
          x={handlePosition[0] + '%'}
        />
        <rect
          ref={r => (this.rightHandle = r)}
          className="handle right-handle"
          onMouseDown={this.onMouseDown}
          x={
            trackWidth ?
            (trackWidth * (handlePosition[1] / 100) - 25)
            :
            `calc(${handlePosition[1]}% - 25px)`
          }
        />
      </svg>
    );
  }
}
