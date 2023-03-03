import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'
import { selectAllEmployees } from '../employees/employeesApiSlice'
import EditEventForm from './EditEventForm'


const EditEvent = () => {
  const { id } = useParams()

  const event = useSelector(state => selectEventById(state, id))
  const employees = useSelector(selectAllEmployees)

  const content = event && employees ? <EditEventForm event={event} employees={employees} /> : <p>Loading...</p>

  return content
}
export default EditEvent