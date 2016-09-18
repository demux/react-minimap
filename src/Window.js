import React, {Component} from 'react'


const body = document.body;
const html = document.documentElement;

function stateMapper(obj) {
  return {
    contentWidth: obj.contentWidth,
    windowHeight: obj.windowHeight,
    scrollWidth: obj.scrollWidth,
    scrollHeight: obj.scrollHeight
  }
}

export default class Window extends Component {
  constructor(props) {
    super(props);

    this.state = stateMapper(this);

    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);

    this._scrollCallback = () => {}
  }

  get window() {
    return window;
  }

  get windowHeight() {
    return this.window.innerHeight;
  }

  get contentWidth() {
    return parseInt(getComputedStyle(body).getPropertyValue('width'));
  }

  get scrollHeight() {
    return Math.max(
      body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight
    );
  }

  get scrollWidth() {
    return Math.max(
      body.scrollWidth, body.offsetWidth,
      html.clientWidth, html.scrollWidth, html.offsetWidth
    );
  }

  onScroll() {
    this._scrollCallback(this.scroll)
  }

  get scroll() {
    return {
      top: this.window.scrollTop || this.window.pageYOffset || html.scrollTop,
      left: this.window.scrollLeft || this.window.pageXOffset || html.scrollLeft
    }
  }

  set scroll({left, top}) {
    this.window.scroll(left, top);
  }

  setScrollCallback(fn) {
    this._scrollCallback = fn
  }

  onResize() {
    this.setState(stateMapper(this));
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
    this.window.addEventListener('scroll', this.onScroll);
    this.mountHook();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    this.window.removeEventListener('scroll', this.onScroll);
    this.unmountHook();
  }

  componentDidUpdate() {
    const oldState = stateMapper(this.state)
    const newState = stateMapper(this)

    if(JSON.stringify(oldState) !== JSON.stringify(newState)) {
      this.setState(newState)
    }
  }

  mountHook() {
    body.className += body.className.split(' ').concat('has-minimap').join('');
  }

  unmountHook() {
    body.className = body.className.replace('has-minimap', '');
  }

  render() {
    const {children, minimap, ...props} = this.props;

    return <div {...props}>
      {children}
      {React.cloneElement(minimap, {...this.state, window: this})}
    </div>
  }
}
