import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Surface, {Mirror} from 'react-mirror'

// Monkey patch for react-mirror
import {unstable_renderSubtreeIntoContainer} from 'react-dom'
React.unstable_renderSubtreeIntoContainer = unstable_renderSubtreeIntoContainer


class MinimapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.onResize = this.onResize.bind(this);
  }

  get window() {
    return this.props.contain ? this.props.parent.refs.window : window;
  }

  onResize() {
    if(!this.props.contain) {
      this.setState({
        windowWidth: this.window.innerWidth,
        windowHeight: this.window.innerHeight
      });
    }

    this.measure();
  }

  measure() {
    if(this.mounted) {
      const surface = ReactDOM.findDOMNode(this.props.parent.refs.surface);
      const wrapperStyle = getComputedStyle(this.refs.wrapper);

      const newState = {
        width: parseInt(wrapperStyle.getPropertyValue('width'), 10),
        height: parseInt(wrapperStyle.getPropertyValue('height'), 10),
        scrollWidth: surface.scrollWidth,
        scrollHeight: surface.scrollHeight
      };

      if(this.props.contain) {
        const _window = ReactDOM.findDOMNode(this.props.parent.refs.window);
        newState.windowWidth = _window.clientWidth;
        newState.windowHeight = _window.clientHeight;
      }

      this.setState(newState);
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.window.addEventListener('resize', this.onResize);

    this.onResize();
    this.measure();
  }

  componentWillUnmount() {
    this.mounted = false;
    this.window.removeEventListener('resize', this.onResize);
  }

  render() {
    const props = {...this.state, window: this.window}
    const {width, height} = this.state;

    const wrapperStyle = {
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden'
    }

    return <div className="react-minimap">
      <div ref="wrapper" style={wrapperStyle}>
        {(width && height) ? React.cloneElement(this.props.children, props) : null}
      </div>
    </div>
  }
}


class MinimapInner extends Component {
  constructor(props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);
    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  get window() {
    return this.props.window;
  }

  onScroll() {
    const win = this.window;
    const doc = document.documentElement;

    this.setState({
      scroll: {
        top: win.scrollTop || win.pageYOffset || doc.scrollTop,
        left: win.scrollLeft || win.pageXOffset || doc.scrollLeft
      }
    });
  }

  onOverlayClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this._scrollTo(e.clientY - this.minimapTop - this.thumbHeight / 2)
  }

  _scrollTo(y) {
    this.window.scroll(this.state.scroll.left, y / this.scaleFactor);
  }

  onDragStart(e) {
    e.preventDefault();
    e.stopPropagation();

    this._yPosInThumb = e.clientY - this.thumbTop;

    window.addEventListener('mousemove', this.onDrag);
    window.addEventListener('mouseup', this.onDragEnd);
  }

  onDrag(e) {
    e.preventDefault();
    e.stopPropagation();

    const {windowHeight} = this.props;

    this._scrollTo(e.clientY - this.minimapTop - this._yPosInThumb);
  }

  onDragEnd(e) {
    e.preventDefault();
    e.stopPropagation();

    this._yPosInThumb = null;

    window.removeEventListener('mousemove', this.onDrag);
    window.removeEventListener('mouseup', this.onDragEnd);
  }

  componentWillMount() {
    this.onScroll();
  }

  componentDidMount() {
    this.refs.mirror.reflect(this.props.parent.refs.surface);
    this.refs.thumbMirror.reflect(this.props.parent.refs.surface);

    this.window.addEventListener('scroll', this.onScroll);
    this.refs.overlay.addEventListener('mousedown', this.onOverlayClick);
    this.refs.thumb.addEventListener('mousedown', this.onDragStart);

  }

  componentWillUnmount() {
    this.window.removeEventListener('scroll', this.onScroll);
    this.refs.overlay.removeEventListener('mousedown', this.onOverlayClick);
    this.refs.thumb.removeEventListener('mousedown', this.onDragStart);
  }

  get minimapTop() {
    return this.refs.overlay.getBoundingClientRect().top;
  }

  get thumbTop() {
    return this.refs.thumb.getBoundingClientRect().top;
  }

  get thumbHeight() {
    return this.props.windowHeight * this.scaleFactor;
  }

  get scaleFactor() {
    return this.props.width / this.props.windowWidth;
  }

  get yOffset() {
    const {height, scrollHeight, windowHeight} = this.props;
    const {scroll} = this.state;

    const scrollHeightScaled = scrollHeight * this.scaleFactor;
    const windowHeightScaled = windowHeight * this.scaleFactor
    const heightScaled = height * this.scaleFactor;

    if(scrollHeightScaled > height) {
      let y = scroll.top * this.scaleFactor;

      let ch = scrollHeightScaled - windowHeightScaled;

      let maxMargin = ch - height;

      let factor = y / ch;

      let viewportFactor = windowHeightScaled / ch;

      return factor * maxMargin + viewportFactor * y;
    }
    return 0;
  }

  get scrollbarStyle() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: this.props.scrollHeight * this.scaleFactor,
      width: this.props.width,
      transform: `translate3d(${0}px, ${-this.yOffset}px, 0)`,
      transformOrigin: '0 0'
    }
  }

  get mirrorStyle() {
    const {windowHeight, windowWidth} = this.props

    return {
      width: windowWidth,
      height: windowHeight,
      transform: `scale3d(${this.scaleFactor}, ${this.scaleFactor}, 1)`,
      transformOrigin: '0 0',
    }
  }

  get thumbStyle() {
    const {windowHeight, windowWidth} = this.props

    const windowWidthScaled = windowWidth * this.scaleFactor
    const windowHeightScaled = windowHeight * this.scaleFactor

    const x = this.state.scroll.left * this.scaleFactor
    const y = this.state.scroll.top * this.scaleFactor - this.yOffset

    return {
      position: 'absolute',
      overflow: 'visible',
      top: 0,
      left: 0,
      width: windowWidthScaled,
      height: windowHeightScaled,
      transform: `translate3d(${x}px, ${y}px, 0)`
    }
  }

  get overlayStyle() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%'
    }
  }

  render() {
    return <div>
      <div className="minimap-scrollbar" style={this.scrollbarStyle}>
        <div style={this.mirrorStyle}>
          <Mirror ref="mirror" />
        </div>

        <div ref="overlay" style={this.overlayStyle} />
      </div>

      <div ref="thumb" className="react-minimap-thumb" style={this.thumbStyle}>
        <div style={this.mirrorStyle}>
          <Mirror ref="thumbMirror" />
        </div>
      </div>
    </div>
  }
}


export default class Minimap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false
    }
  }

  componentDidMount() {
    if(!!this.props.contain) {
      this.setState({
        mounted: true
      })
    }
  }

  render() {
    let {children, className, contain, ...props} = this.props;

    contain = !!contain;

    const style = contain ? {
      position: 'relative'
    } : {};

    if(contain) {
      className += ' react-minimap-contain'
    }

    const shouldRenderWrapper = !contain || (contain && this.state.mounted);

    return <div ref="window" {...{style, className}}>
      <Surface ref="surface">
        <div className="react-minimap-content">{children}</div>
      </Surface>

      {shouldRenderWrapper ? <MinimapWrapper {...{contain, ...props}} parent={this}>
        <MinimapInner parent={this} />
      </MinimapWrapper> : null}
    </div>
  }
}
