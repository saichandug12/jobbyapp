import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobCard = props => {
  const {jobsList} = props
  const {
    id,
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobsList

  return (
    <Link to={`/jobs/${id}`} className="link-styles">
      <li>
        <li className="list-card">
          <div className="title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
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

          <h1 className="description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </li>
      </li>
    </Link>
  )
}

export default JobCard
