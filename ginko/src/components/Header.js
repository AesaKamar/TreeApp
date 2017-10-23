import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/header.css'

class Header extends Component {
  constructor() {
    super()
    // to add a new navItem, add a new object to routeArray
    let routeArray = [
      {
        path: '/login',
        text: 'Login',
        id: 0
      },
      {
        path: '/graph',
        text: 'Graph',
        id: 1
      }
    ]
    this.state = {
      routes: routeArray,
      navItemSelected: 0
    }
  }

  state: {
    routes: [any],
    navItemSelected: number
  };

  setActive(id:number) {
    this.setState({ navItemSelected: id })
  }

  // render a link in the navbar
  renderNavItem(navItem: {path:string, text:string, id:number}) {
    // determine css class
    let linkAccentClass = null
    if (this.state.navItemSelected === navItem.id) {
      linkAccentClass = 'link-accent-selected'
    } else {
      linkAccentClass = 'link-accent'
    }
    // render navItem
    return (
      <div className="nav-item" key={navItem.id}>
        <div className="link-box">
          <Link onClick={this.setActive.bind(this, navItem.id)}
            to={navItem.path}
          >
            {navItem.text}
          </Link>
        </div>
        <div className={linkAccentClass} />
      </div>
    )
  }

  render() {
    return (
      <div className="nav-bar">
        <div className="link-container">
          {this.state.routes.map(routeInfo => (
            this.renderNavItem(routeInfo)
          ))}
        </div>
        <div className="nav-accent"/>
      </div>
    )
  }
}

export default Header
