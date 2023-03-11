import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectEmployeeById } from './employeesApiSlice'
import { selectAllEmployees } from './employeesApiSlice'
import EmployeeLayout from './EmployeeLayout'


const EmployeeOverview = () => {
  const { id } = useParams()

  const employee = useSelector(state => selectEmployeeById(state, id))
  const employees = useSelector(selectAllEmployees)

  const content = employee && employees ? <EmployeeLayout employee={employee} employees={employees} /> : <p>Loading...</p>

  return content
}
export default EmployeeOverview