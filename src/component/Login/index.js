import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', showSubmitError: false}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeUserPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitError = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect path="/" />
    }

    return (
      <div className="bg-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form className="login-form" onSubmit={this.onLoginForm}>
            <div>
              <label htmlFor="userName" className="headings">
                USERNAME
              </label>
              <input
                id="userName"
                type="text"
                value={username}
                placeholder="Username"
                className="input-el"
                onChange={this.onChangeUserName}
              />
            </div>
            <div>
              <label htmlFor="password" className="headings">
                PASSWORD
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Username"
                className="input-el"
                onChange={this.onChangeUserPassword}
              />
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
