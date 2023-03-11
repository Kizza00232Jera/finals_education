import React from 'react'
import Footer from '../components/Footer'
import EventsHeader from '../features/events/EventsHeader'
import EventOverview from '../features/events/EventOverview'

const EventPage = () => {
  return (
    <div>
      <EventsHeader />
      <EventOverview/>
      <Footer />
    </div>
  )
}

export default EventPage



