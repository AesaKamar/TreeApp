import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import GraphView from '../views/GraphView'
import LoginView from '../views/LoginView'
import PeopleView from '../views/PeopleView'
import ProfileView from '../views/ProfileView'
import NotFoundView from '../views/NotFoundView'

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LoginView}/>
        <Route exact path="/graph" component={GraphView}/>
        <Route exact path="/login" component={LoginView}/>
        <Route exact path="/people" component={PeopleView}/>
        <Route exact path="/profile" component={ProfileView}/>
        <Route path="*" component={NotFoundView} />
      </Switch>
    )
  }
}

export default Routes
