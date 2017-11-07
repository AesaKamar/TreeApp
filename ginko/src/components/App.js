import React, { Component } from 'react'
import '../styles/app.css'
import Routes from './Routes'
import Header from './Header'

import ginko from 'ginko-api-service'

class App extends Component {
  constructor() {
    super()
    ginko.setDomain('http://localhost:1337')
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Routes/>
      </div>
    )
  }
}

export default App
