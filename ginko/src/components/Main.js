import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import GraphView from '../views/GraphView'
import LoginView from '../views/LoginView'

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/graph" component={GraphView}/>
        <Route exact path="/login" component={LoginView}/>
      </Switch>
    )
  }
}

export default Main
