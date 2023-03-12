import React from 'react'
import EventsList from '../features/events/EventsList'
import EventsHeader from '../features/events/EventsHeader'

const EventsPage = () => {
  return (
    <div>
      <EventsHeader />
      <EventsList/>
    </div>
  )
}


export default EventsPage
