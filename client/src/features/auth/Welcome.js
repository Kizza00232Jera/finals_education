import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <section>
    <div>
      Welcome
    </div>
    <p><Link to="/dash/events">View Events</Link></p>
    <p><Link to="/dash/events/new">Add new Event</Link></p>

    <p><Link to="/dash/employees">View Employees</Link></p>
    <p><Link to="/dash/employees/new">Add new Employee</Link></p>
    </section>

  )
}

export default Welcome
