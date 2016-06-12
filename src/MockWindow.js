import React, {Component} from 'react'


export default class MockWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null,
      scroll: {
        top: 0,
        left: 0
      }
    };

    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  get innerWidth() {
    return this.state.width;
  }

  get innerHeight() {
    return this.state.height;
  }

  get scrollTop() {
    return this.refs.window.scrollTop;
  }

  get scrollLeft() {
    return this.refs.window.scrollLeft;
  }

  onScroll(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  onResize(e) {
    this.refs.window.dispatchEvent(e);
  }

  addEventListener(eventName, callback) {
    this.refs.window.addEventListener(eventName, callback);
  }

  removeEventListener(eventName, callback) {
    this.refs.window.removeEventListener(eventName, callback);
  }

  scroll(x, y) {
    this.refs.window.scroll(x, y);

    this.setState({
      scroll: {
        top: y,
        left: x
      }
    })
  }

  componentDidUpdate() {
    this.refs.window.scroll(this.state.scroll.left, this.state.scroll.top);
  }

  componentDidMount() {
    this.refs.window.addEventListener('resize', this.onResize);
    this.refs.window.addEventListener('scroll', this.onScroll);

    const style = getComputedStyle(this.refs.window);

    this.setState({
      width: parseInt(style.getPropertyValue('width'), 10),
      height: parseInt(style.getPropertyValue('height'), 10)
    });

    this.refs.window.scroll(this.state.scroll.left, this.state.scroll.top);
  }

  componentWillUnmount() {
    this.refs.window.removeEventListener('resize', this.onResize);
    this.refs.window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const {className} = this.props;

    return <div style={{position: 'relative'}}>
      <div ref="window" {...{className}}>{this.props.children}</div>
    </div>
  }
}
