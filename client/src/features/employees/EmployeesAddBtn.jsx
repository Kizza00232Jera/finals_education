import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'

const EmployeesAddBtn = () => {
  return (
    <div>
                        <Link
                        to="http://localhost:3000/dash/employees/new"><FontAwesomeIcon icon={faPlus} />
                        </Link>                                  
    </div>
  )
}

export default EmployeesAddBtn
