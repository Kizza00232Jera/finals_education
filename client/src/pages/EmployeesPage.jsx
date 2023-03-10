import React from 'react'
import Footer from '../components/Footer'
import EmployeesList from '../features/employees/EmployeesList'
import EmployeesAddBtn from '../features/employees/EmployeesAddBtn'
import EmployeesHeader from '../features/employees/EmployeesHeader'

const EmployeesPage = () => {
  return (
    <div>
      <EmployeesHeader />
      <EmployeesAddBtn />
      <EmployeesList/>
      <Footer />
    </div>
  )
}


export default EmployeesPage
