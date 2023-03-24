import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'

import JobCard from '../JobCard'
import FilterData from '../FilterData'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  success: 'SUCCESS',
  pending: 'INPROGRESS',
  failure: 'FAILURE',
  initial: 'INITIAL',
}

class AllJobDetails extends Component {
  state = {
    jobDetailsList: [],
    searchInput: '',
    filterType: [],
    filterSalary: 0,
    profileData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = {
        name: data.profile_details.name,
        profileImage: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        profileData: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getJobsData = async () => {
    this.setState({apiStatus: apiStatusConstants.pending})
    const {searchInput, filterSalary, filterType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${filterType.join()}&minimum_package=${filterSalary}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formattedData = data.jobs.map(eachItem => ({
        id: eachItem.id,
        companyLogoUrl: eachItem.company_logo_url,
        title: eachItem.title,
        rating: eachItem.rating,
        location: eachItem.location,
        employmentType: eachItem.employment_type,
        packagePerAnnum: eachItem.package_per_annum,
        jobDescription: eachItem.job_description,
      }))
      this.setState({
        jobDetailsList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsData()
    }
  }

  onChangeTypeFilter = type => {
    this.setState(
      prevState => ({filterType: [...prevState.filterType, type]}),
      this.getJobsData,
    )
  }

  onChangeSalary = id => {
    this.setState({filterSalary: id}, this.getJobsData)
  }

  renderSuccessView = () => {
    const {jobDetailsList, searchInput} = this.state
    const jobsList = jobDetailsList.length > 0

    return jobsList ? (
      <>
        <div>
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.getJobsData}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div>
          <ul className="list-styles">
            {jobDetailsList.map(eachItem => (
              <JobCard jobsList={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </>
    ) : (
      <>
        <div>
          <input
            type="search"
            placeholder="Search"
            className="search-input"
            value={searchInput}
            onChange={this.onChangeSearchInput}
            onKeyDown={this.onEnterKey}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.getJobsData}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        <div className="no-jobs-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs"
          />
          <h1 className="no-jobs-heading">No Jobs Found</h1>
          <p className="no-jobs-desc">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
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
        onClick={this.getJobsData}
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
        return this.renderLoaderView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    return (
      <div className="profile-bg-container">
        <img src={profileData.profileImage} alt="profile" />
        <h1 className="name">{profileData.name}</h1>
        <p className="bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderLoaderViewProfile = () => (
    <div className="profile-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureViewProfile = () => (
    <button
      type="button"
      data-testid="button"
      className="jobs-failure-button"
      onClick={this.getProfileData}
    >
      Retry
    </button>
  )

  renderProfileSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.pending:
        return this.renderLoaderViewProfile()
      case apiStatusConstants.failure:
        return this.renderFailureViewProfile()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-flex-container">
        <div className="filter-container">
          {this.renderProfileSwitch()}

          <hr className="line" />
          <FilterData
            employmentType={employmentTypesList}
            salaryRange={salaryRangesList}
            onChangeType={this.onChangeTypeFilter}
            onChangeSalaryRange={this.onChangeSalary}
          />
        </div>

        <div className="job-items-container">{this.renderSwitchCase()}</div>
      </div>
    )
  }
}

export default AllJobDetails
