import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllEmployees } from '../features/employees/employeesApiSlice'
import NewEventForm from '../features/events/NewEventForm'

const NewEventPage = () => {
  const employees = useSelector(selectAllEmployees)

  if (!employees?.length) return <p>Not Currently Available</p>


  const content = <NewEventForm employees={employees} />


  return content
}

export default NewEventPage
