import React, {Component} from 'react'


export default class MockWindow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: null,
      height: null
    };

    this.onResize = this.onResize.bind(this);
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
    return this.refs.window.scrollLop;
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
  }

  componentDidMount() {
    this.refs.window.addEventListener('resize', this.onResize);

    const style = getComputedStyle(this.refs.window);

    this.setState({
      width: parseInt(style.getPropertyValue('width'), 10),
      height: parseInt(style.getPropertyValue('height'), 10)
    });
  }

  componentWillUnmount() {
    this.refs.window.removeEventListener('resize', this.onResize);
  }

  render() {
    const {className} = this.props;

    return <div style={{position: 'relative'}}>
      <div ref="window" {...{className}}>{this.props.children}</div>
    </div>
  }
}
