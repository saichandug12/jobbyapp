import './index.css'

const SkillsDetails = props => {
  const {skillsList} = props
  const {imageUrl, name} = skillsList

  return (
    <li className="skills-container">
      <img src={imageUrl} alt={name} className="skills-image" />
      <p className="skills">{name}</p>
    </li>
  )
}

export default SkillsDetails
