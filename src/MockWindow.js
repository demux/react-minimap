import React, {Component} from 'react'
import Window from './Window'


export default class MockWindow extends Window {
  constructor(props) {
    super(props);

    this.state.mounted = false;
  }

  componentDidMount() {
    super.componentDidMount();
    this.setState({mounted: true});
  }

  get window() {
    return this.refs && this.refs.window ? this.refs.window : {};
  }

  get style() {
    return this.refs && this.refs.window ? getComputedStyle(this.refs.window) : {};
  }

  get windowHeight() {
    return this.refs && this.refs.window
      ? parseInt(this.style.getPropertyValue('height'), 10)
      : 1;
      // Dividing by 0 would cause an error.
  }

  get contentWidth() {
    return this.refs && this.refs.window
      ? parseInt(this.style.getPropertyValue('width'), 10)
      : 1;
      // Dividing by 0 would cause an error.
  }

  get scrollHeight() {
    return this.window.scrollHeight || 1;
    // Dividing by 0 would cause an error.
  }

  get scrollWidth() {
    return this.window.scrollWidth || 1;
    // Dividing by 0 would cause an error.
  }

  mountHook() {}
  unmountHook() {}

  render() {
    const {mounted} = this.state;
    const {children, minimap, className, ...props} = this.props;

    const windowClassName = `react-minimap-contain ${className}`;

    return <div style={{position: 'relative'}} className={windowClassName}>
      <div className="react-minimap-window-wrapper">
        <div ref="window" {...props} className="react-minimap-window">
          {children}
        </div>
      </div>

      {mounted ? React.cloneElement(minimap, {...this.state, window: this}) : null}
    </div>
  }
}
