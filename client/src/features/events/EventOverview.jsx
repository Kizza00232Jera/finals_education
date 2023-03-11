import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'
import { selectAllEmployees } from '../employees/employeesApiSlice'
import EventLayout from './EventLayout'


const EventOverview = () => {
  const { id } = useParams()

  const event = useSelector(state => selectEventById(state, id))
  const employees = useSelector(selectAllEmployees)

  const content = event && employees ? <EventLayout event={event} employees={employees} /> : <p>Loading...</p>

  return content
}
export default EventOverview