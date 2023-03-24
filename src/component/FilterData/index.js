import './index.css'

const FilterData = props => {
  const getEmploymentTypeList = () => {
    const {employmentType} = props

    return employmentType.map(employ => {
      const {onChangeType} = props
      const onChangeEmployType = event => onChangeType(event.target.value)

      return (
        <li
          className="checkbox-list-items"
          key={employ.employmentTypeId}
          onChange={onChangeEmployType}
        >
          <input
            type="checkbox"
            className="check-radio"
            id={employ.employmentTypeId}
            value={employ.employmentTypeId}
          />
          <label htmlFor={employ.employmentTypeId} className="label">
            {employ.label}
          </label>
        </li>
      )
    })
  }

  const renderEmploymentType = () => (
    <div className="salary-container">
      <h1 className="filter-headings">Type of Employment</h1>
      <ul className="salary-range-container">{getEmploymentTypeList()}</ul>
    </div>
  )

  const getSalaryRangeList = () => {
    const {salaryRange} = props

    return salaryRange.map(salary => {
      const {onChangeSalaryRange} = props
      const onChangeSalary = () => onChangeSalaryRange(salary.salaryRangeId)

      return (
        <li
          className="checkbox-list-items"
          key={salary.salaryRangeId}
          onChange={onChangeSalary}
        >
          <input
            type="radio"
            className="check-radio"
            id={salary.salaryRangeId}
            name="salary"
          />
          <label htmlFor={salary.salaryRangeId} className="label">
            {salary.label}
          </label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <div className="salary-container">
      <h1 className="filter-headings">Salary Range</h1>
      <ul className="salary-range-container">{getSalaryRangeList()}</ul>
    </div>
  )

  return (
    <div className="job-filter-group">
      {renderEmploymentType()}
      <hr className="line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterData
