import React, {Component} from 'react'


const body = document.body;
const html = document.documentElement;


export default class Window extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollWidth: this.scrollWidth,
      scrollHeight: this.scrollHeight,
      scroll: this.scroll
    };

    this.onResize = this.onResize.bind(this);
    this.onScroll = this.onScroll.bind(this);
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

  get scroll() {
    return {
      top: window.scrollTop || window.pageYOffset || html.scrollTop,
      left: window.scrollLeft || window.pageXOffset || html.scrollLeft
    }
  }

  scroll(x, y) {
    window.scroll(x, y);
  }

  onScroll() {
    this.setState({scroll: this.scroll});
  }

  onResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      scrollWidth: this.scrollWidth,
      scrollHeight: this.scrollHeight
    });
  }

  componentDidMount() {
    this.onResize();

    window.addEventListener('resize', this.onResize);
    window.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll);
  }

  render() {
    const {children, ...props} = this.props;
    const childProps = {...this.state, window};

    const childrenWithProps = React.Children.map(children, (child) => {
      if(child.type.name === 'MinimapWrapper') {
        return React.cloneElement(child, childProps);
      }
      return child;
    });

    return <div {...props}>{childrenWithProps}</div>
  }
}
