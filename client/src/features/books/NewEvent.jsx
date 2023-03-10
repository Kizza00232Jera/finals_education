import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllEmployees } from '../employees/employeesApiSlice'
import NewEventForm from './NewEventForm'

const NewEvent = () => {
  const employees = useSelector(selectAllEmployees)

  if (!employees?.length) return <p>Not Currently Available</p>


  const content = <NewEventForm employees={employees} />


  return content
}

export default NewEvent
