import React, {Component} from 'react'

import {Link} from 'react-router'


export default class Wrapper extends Component {
  render() {
    return <div className="main">
      <header className="top fixed-on-minimap">
        <div className="wrapper">
          <h1>React Minimap</h1>

          <nav>
            <ul>
              <li><Link to="/nested">Nested</Link></li>
              <li><Link to="/contained">Contained</Link></li>
              <li><Link to="/">Full Window</Link></li>
            </ul>
          </nav>
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
