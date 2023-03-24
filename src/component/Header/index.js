import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-logo"
        />
      </Link>
      <ul className="heading-container">
        <li className="heading-container">
          <Link to="/" className="link-style">
            <li className="nav-headings ">Home</li>
          </Link>
          <Link to="/jobs" className="link-style">
            <li className="nav-headings ">Jobs</li>
          </Link>
        </li>
      </ul>
      <div>
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
