import React, {Component} from 'react'
import Window from './Window'


export default class MockWindow extends Window {
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

  get windowWidth() {
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

  render() {
    const {children, className, ...props} = this.props;
    const childProps = {...this.state, window: this.window};

    const childrenWithProps = React.Children.map(children, (child) => {
      if(child.type.name === 'MinimapWrapper') {
        return React.cloneElement(child, childProps);
      }
      return child;
    });

    const windowClassName = `react-minimap-contain ${className}`;

    return <div style={{position: 'relative'}}>
      <div ref="window" {...props} className={windowClassName}>
        {childrenWithProps}
      </div>
    </div>
  }
}
