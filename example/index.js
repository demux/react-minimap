import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, hashHistory} from 'react-router'

import Example from './components/Example'
import Contained from './components/Contained'


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Example} />
    <Route path="/contained" component={Contained} />
  </Router>
), document.getElementById('root'));
