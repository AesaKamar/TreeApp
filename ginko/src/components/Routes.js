import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import GraphView from '../views/GraphView'
import LoginView from '../views/LoginView'
import ThirdView from '../views/ThirdView'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginView}/>
        <Route exact path="/graph" component={GraphView}/>
        <Route exact path="/login" component={LoginView}/>
        <Route exact path="/third" component={ThirdView}/>
      </Switch>
    )
  }
}

export default Routes
