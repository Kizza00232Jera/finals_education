import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const EmployeesHeader = () => {

    const { pathname } = useLocation()


  return (
    <header>
    <div>
        <Link to="/dash/employees">
            <h1>Employees</h1>
            <p>{pathname}</p>

        </Link>
    </div>
</header>
  )
}

export default EmployeesHeader
