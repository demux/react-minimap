import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import Example from './components/Example'
import Contained from './components/Contained'
import Nested from './components/Nested'


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Example} />
    <Route path="/contained" component={Contained} />
    <Route path="/nested" component={Nested} />
  </Router>
), document.getElementById('root'));
