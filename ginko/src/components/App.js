import React, { Component } from 'react'
import '../styles/app.css'
import Routes from './Routes'
import Header from './Header'

class App extends Component {
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
