import React, {Component} from 'react'
import Surface from 'react-mirror'

import Window from './Window'
import MockWindow from './MockWindow'
import MinimapWrapper from './MinimapWrapper'
import MinimapInner from './MinimapInner'


export default class Minimap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mounted: false
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  render() {
    const {children, className, contain, ...props} = this.props;
    const {mounted} = this.state;

    const WindowElement = !contain ? Window : MockWindow;

    // className={`react-minimap-contain ${className}`}

    return <WindowElement className={className}>
      <Surface ref="surface">
        <div className="react-minimap-content">{children}</div>
      </Surface>

      {mounted ? <MinimapWrapper {...props}>
        <MinimapInner parent={this} />
      </MinimapWrapper> : <div/>}
    </WindowElement>
  }
}
