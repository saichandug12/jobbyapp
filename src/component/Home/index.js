import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <div className="home-bg-container">
        <div className="home-text-container">
          <h1 className="home-page-heading">
            Find The Job That Fits Your Life
          </h1>
          <p className="home-page-para">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fit your abilities and potential
          </p>
          <Link to="/jobs">
            <button type="button" className="home-btn">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home
