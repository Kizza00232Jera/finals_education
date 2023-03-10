import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const EventsHeader = () => {

    const { pathname } = useLocation()

    
  return (
    <header>
    <div>
        <Link to="/dash/events">
            <h1>Events</h1>
            <p>{pathname}</p>

        </Link>
    </div>
</header>
  )
}

export default EventsHeader
