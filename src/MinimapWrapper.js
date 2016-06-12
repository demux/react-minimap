import React, {Component} from 'react'


export default class MinimapWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false,
      width: null,
      height: null
    };
  }

  componentDidMount() {
    this.measure(this.props);
  }

  componentWillReceiveProps(props) {
    const old = this.props;

    // Remeasure if window size or document size has changed:
    const shouldRemeasure = (
      props.windowWidth !== old.windowWidth ||
      props.windowHeight !== old.windowHeight ||
      props.scrollWidth !== old.scrollWidth ||
      props.scrollHeight !== old.scrollHeight
    );

    if(shouldRemeasure) {
      this.measure(props);
    }
  }

  measure(props) {
    const {windowWidth, windowHeight, scrollWidth, scrollHeight} = props;

    const wrapperStyle = getComputedStyle(this.refs.wrapper);

    const state = {
      mounted: true,
      width: parseInt(wrapperStyle.getPropertyValue('width'), 10),
      height: parseInt(wrapperStyle.getPropertyValue('height'), 10)
    };

    state.scaleFactor = state.width / windowWidth;

    state.thumbWidth = state.scaleFactor * windowWidth;
    state.thumbHeight = state.scaleFactor * windowHeight;

    state.scrollbarWidth = state.scaleFactor * scrollWidth;
    state.scrollbarHeight = state.scaleFactor * scrollHeight;

    this.setState(state);
  }

  render() {
    const {mounted, ...state} = this.state;
    const props = {...state, ...this.props}

    const wrapperStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }

    return <div className="react-minimap">
      <div ref="wrapper" style={wrapperStyle}>
        {mounted ? React.cloneElement(this.props.children, props) : null}
      </div>
    </div>
  }
}
