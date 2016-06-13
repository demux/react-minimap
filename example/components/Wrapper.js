import React, {Component} from 'react'


export default class Wrapper extends Component {
  render() {
    return <div className="main">
      <header className="top fixed-on-minimap">
        <div className="wrapper">
          <h1>React Minimap</h1>
        </div>
      </header>

      <div className="content">
        {this.props.children}
      </div>

      <footer className="bottom fixed-on-minimap">
        <div className="wrapper">
          Created by Arnar Yngvason
        </div>
      </footer>
    </div>
  }
}
