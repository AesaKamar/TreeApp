import React, { Component } from 'react'
import LoginForm from '../components/LoginForm'

import '../styles/loginview.css'

class LoginView extends Component {
  render() {
    return (
      <div className="form-container">
        <LoginForm />
      </div>
    )
  }
}

export default LoginView
