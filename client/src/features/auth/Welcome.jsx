import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const Welcome = () => {

  //remove unused values
  const {  employeeEmail, isManager, isAdmin} = useAuth()


  return (
    <section>
    <div>
      Welcome {employeeEmail}
    </div>
    <p><Link to="/dash/events">View Events</Link></p>
    <p><Link to="/dash/events/new">Add new Event</Link></p>

    <p><Link to="/dash/employees">View Employees</Link></p>
    {(isManager || isAdmin) && <p><Link to="/dash/employees/new">Add new Employee</Link></p>}
    </section>

  )
}

export default Welcome
