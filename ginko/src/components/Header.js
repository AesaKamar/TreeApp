import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import '../styles/header-style.css'

class Header extends Component {
  render() {
    return (
      <nav>
        <div id="navbar">
          <ul className="flex-container">
            <li className="flex-item"><Link to="/login">{'Login'}</Link></li>
            <li className="flex-item"><Link to="/graph">{'Graph'}</Link></li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Header
