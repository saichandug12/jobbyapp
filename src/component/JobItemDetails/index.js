import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiShareBoxLine} from 'react-icons/ri'

import Header from '../Header'
import SkillsDetails from '../SkillsDetails'
import SimilarJobDetails from '../SimilarJobDetails'

import './index.css'

const apiStatusConstants = {
  success: 'SUCCESS',
  pending: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobItem: {},
    lifeAtCompanyDetails: {},
    skillDetails: [],
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  formattedData = data => ({
    id: data.id,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    title: data.title,
    rating: data.rating,
    location: data.location,
    employmentType: data.employment_type,
    packagePerAnnum: data.package_per_annum,
    jobDescription: data.job_description,
  })

  getJobItemDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobItemDetails = this.formattedData(data.job_details)
      const lifeAtCompany = {
        imageUrl: data.job_details.life_at_company.image_url,
        description: data.job_details.life_at_company.description,
      }

      const skills = data.job_details.skills.map(eachItem => ({
        imageUrl: eachItem.image_url,
        name: eachItem.name,
      }))

      const similarJobs = data.similar_jobs.map(eachItem =>
        this.formattedData(eachItem),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobItem: jobItemDetails,
        lifeAtCompanyDetails: lifeAtCompany,
        skillDetails: skills,
        similarJobDetails: similarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {
      jobItem,
      skillDetails,
      lifeAtCompanyDetails,
      similarJobDetails,
    } = this.state
    const {
      companyLogoUrl,
      title,
      companyWebsiteUrl,
      rating,
      location,
      employmentType,
      jobDescription,
      packagePerAnnum,
    } = jobItem

    const {imageUrl, description} = lifeAtCompanyDetails
    return (
      <>
        <div className="job-card">
          <div className="title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="logo-company"
            />
            <div>
              <h1 className="title">{title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="location-package-container">
            <div className="title-container">
              <div className="rating-container">
                <MdLocationOn className="icons" />
                <p className="mini-headings">{location}</p>
              </div>
              <div className="rating-container">
                <BsFillBriefcaseFill className="icons" />
                <p className="mini-headings">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>

          <hr className="line" />
          <div className="anchor-flex-container">
            <h1 className="job-item-headings">Description</h1>
            <a href={companyWebsiteUrl} className="anchor-link">
              Visit <RiShareBoxLine className="visit-icon" />
            </a>
          </div>
          <p className="job-item-description">{jobDescription}</p>
          <h1 className="job-item-headings">Skills</h1>
          <ul className="skills-list-styles">
            {skillDetails.map(eachItem => (
              <SkillsDetails key={eachItem.id} skillsList={eachItem} />
            ))}
          </ul>
          <h1 className="job-item-headings">Life at Company</h1>
          <div className="anchor-flex-container">
            <p className="job-item-description"> {description} </p>
            <img
              src={imageUrl}
              alt="life at company"
              className="company-image"
            />
          </div>
        </div>
        <h1 className="job-item-headings">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobDetails.map(eachItem => (
            <SimilarJobDetails key={eachItem.id} similarJobsList={eachItem} />
          ))}
        </ul>
      </>
    )
  }

  renderLoadingView = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-desc">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        data-testid="button"
        className="jobs-failure-button"
        onClick={this.getJobItemDetails}
      >
        Retry
      </button>
    </div>
  )

  renderSwitchCase = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.pending:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-bg-container">{this.renderSwitchCase()}</div>
      </>
    )
  }
}

export default JobItemDetails
