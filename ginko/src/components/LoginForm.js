import React, { Component } from 'react'

import '../styles/loginform.css'

class LoginForm extends Component {
  constructor() {
    super()

    this.state = {
      email: '',
      password: ''
    }
  }

  state: {
    email: string,
    password: string
  };

  updateEmail(evt) {
    this.setState({email: evt.target.value})
  }

  updatePassword(evt) {
    this.setState({password: evt.target.value})
  }

  // This validation is only for form highlighting, reverify on backend
  isValidEmail(email: string) {
    let re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return re.test(email)
  }

  getEmailStyle() {
    if (this.isValidEmail(this.state.email)) {
      return 'email valid'
    } else if (this.state.email.length > 0) {
      return 'email dirty'
    }
    return 'email'
  }

  getPasswordStyle() {
    if (this.state.password.length > 0) {
      return 'password valid'
    }
    return 'password'
  }

  login() {
    return null
  }

  render() {
    let emailClass = this.getEmailStyle()
    let passwordClass = this.getPasswordStyle()

    return (
      <div className="form">
        <div className="input-container">
          <input
            type="email"
            onChange={this.updateEmail.bind(this)}
            value={this.state.email}
            className={emailClass}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            autoComplete="false"
            onChange={this.updatePassword.bind(this)}
            value={this.state.password}
            className={passwordClass}
          />
        </div>
        <div className="input-container">
          <input
            type="submit"
            value="Submit"
            onClick={this.login.bind(this)}
            className="login-button"
          />
        </div>
      </div>
    )
  }
}

export default LoginForm
