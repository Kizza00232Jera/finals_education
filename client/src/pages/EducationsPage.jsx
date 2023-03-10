import React from 'react'
import Footer from '../components/Footer'
import DashHeader from '../components/DashHeader'
import EventsList from '../features/events/EventsList'
import EventsAddBtn from '../features/events/EventsAddBtn'

const EducationsPage = () => {
  return (
    <div>
      <DashHeader />
      <EventsAddBtn />
      <EventsList/>
      <Footer />
    </div>
  )
}


export default EducationsPage
