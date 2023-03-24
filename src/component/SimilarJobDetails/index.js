import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobDetails = props => {
  const {similarJobsList} = props
  console.log(similarJobsList)
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobsList

  return (
    <li className="similar-job-card">
      <div className="title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-jobs-company-logo"
        />
        <div>
          <h1 className="title">{title}</h1>
          <div className="rating-container">
            <AiFillStar className="star-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="job-item-headings">Description</h1>
      <p className="job-item-description">{jobDescription}</p>
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
      </div>
    </li>
  )
}

export default SimilarJobDetails
