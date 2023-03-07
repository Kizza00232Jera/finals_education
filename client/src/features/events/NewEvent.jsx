import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllEmployees } from '../employees/employeesApiSlice'
import NewEventForm from './NewEventForm'

const NewEvent = () => {
  const employees = useSelector(selectAllEmployees)
  
  const content = employees ? <NewEventForm employees={employees} /> : <p>loading...</p>
  
  
  return content
}

export default NewEvent
