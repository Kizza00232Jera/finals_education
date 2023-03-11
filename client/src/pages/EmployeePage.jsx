import React from 'react'
import Footer from '../components/Footer'
import EmployeeOverview from '../features/employees/EmployeeOverview'
import EmployeesHeader from '../features/employees/EmployeesHeader'


const EmployeePage = () => {
  return (
    <div>
      <EmployeesHeader />
      <EmployeeOverview/>
      <Footer />
    </div>
  )
}

export default EmployeePage



