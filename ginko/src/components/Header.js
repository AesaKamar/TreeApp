import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <nav>
        <ul>
          <li><Link to="/login">{'Login'}</Link></li>
          <li><Link to="/graph">{'Graph'}</Link></li>
        </ul>
      </nav>
    )
  }
}

export default Header
