import React from 'react'
import Footer from '../components/Footer'
import EventsList from '../features/events/EventsList'
import EventsAddBtn from '../features/events/EventsAddBtn'
import EventsHeader from '../features/events/EventsHeader'

const EventsPage = () => {
  return (
    <div>
      <EventsHeader />
      <EventsAddBtn />
      <EventsList/>
      <Footer />
    </div>
  )
}


export default EventsPage
