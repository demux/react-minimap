import React, {Component} from 'react'
import {Mirror} from 'react-mirror'


// Monkey patch for react-mirror
import {unstable_renderSubtreeIntoContainer} from 'react-dom'
React.unstable_renderSubtreeIntoContainer = unstable_renderSubtreeIntoContainer


export default class MinimapInner extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    this.onOverlayClick = this.onOverlayClick.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDrag = this.onDrag.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onOverlayClick(e) {
    e.preventDefault();
    e.stopPropagation();

    this._scrollTo(e.clientY - this.minimapTop - this.props.thumbHeight / 2)
  }

  _scrollTo(y) {
    this.props.window.scroll(this.props.scroll.left, y / this.scaleFactor);
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

  componentDidMount() {
    this.refs.mirror.reflect(this.props.parent.refs.surface);
    this.refs.thumbMirror.reflect(this.props.parent.refs.surface);

    this.refs.overlay.addEventListener('mousedown', this.onOverlayClick);
    this.refs.thumb.addEventListener('mousedown', this.onDragStart);

  }

  componentWillUnmount() {
    this.refs.overlay.removeEventListener('mousedown', this.onOverlayClick);
    this.refs.thumb.removeEventListener('mousedown', this.onDragStart);
  }

  get minimapTop() {
    return this.refs.overlay.getBoundingClientRect().top;
  }

  get thumbTop() {
    return this.refs.thumb.getBoundingClientRect().top;
  }

  get scaleFactor() {
    return this.props.scaleFactor;
  }

  get yOffset() {
    const {height, scrollbarHeight, thumbHeight, scroll} = this.props;

    if(scrollbarHeight > height) {
      let y = scroll.top * this.scaleFactor;

      let ch = scrollbarHeight - thumbHeight;

      let maxMargin = ch - height;

      let factor = y / ch;

      let viewportFactor = thumbHeight / ch;

      return factor * maxMargin + viewportFactor * y;
    }
    return 0;
  }

  get scrollbarStyle() {
    const {width, scrollbarHeight} = this.props;

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: width,
      height: scrollbarHeight,
      transform: `translate3d(${0}px, ${-this.yOffset}px, 0)`,
      transformOrigin: '0 0'
    }
  }

  get mirrorStyle() {
    const {windowHeight, windowWidth} = this.props

    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width: windowWidth,
      height: windowHeight,
      transform: `scale3d(${this.scaleFactor}, ${this.scaleFactor}, 1)`,
      transformOrigin: '0 0',
      overflow: 'visible'
    }
  }

  get thumbStyle() {
    const {thumbHeight, thumbWidth, scroll} = this.props

    // console.log(scroll)

    const x = scroll.left * this.scaleFactor
    const y = scroll.top * this.scaleFactor - this.yOffset

    return {
      position: 'absolute',
      overflow: 'visible',
      top: 0,
      left: 0,
      width: thumbWidth,
      height: thumbHeight,
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
      <div className="react-minimap-scrollbar" style={this.scrollbarStyle}>
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
