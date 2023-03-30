import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectEmployeeById } from './employeesApiSlice'

import React from 'react'
import useAuth from '../../hooks/useAuth'

const Employee = ({ employeeId }) => {
    const employee = useSelector(state => selectEmployeeById(state, employeeId))

    const navigate = useNavigate()
    const {  isManager, isAdmin } = useAuth()


    if (employee) {
        const handleEdit = () => navigate(`/dash/employees/${employeeId}`)
        const handleEmployeePage = () => navigate(`/dash/employees/employee/${employeeId}`)


        const employeeRolesString = employee.employeeRole.toString().replaceAll(',', ', ')
        const employeeDepartmentsString = employee.employeeDepartment.toString().replaceAll(',', ', ')

        
        
        let editBtn = null
        if (isManager || isAdmin) {
                editBtn = (
                    <div  className="p-3 m-3 basis-1/12">
                    <button
                        data-testid={employee.employeeEmail}
                        onClick={handleEdit}
                        >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            )         
        }

        //console.log(employee)
        return (
            
            
              <div className="border border-soft-gray flex flex-row rounded-lg mb-2 bg-white">
              <div onClick={handleEmployeePage} className="p-3 m-3 basis-4/12 text-lg"> <FontAwesomeIcon icon={faMicrophone}/> {employee.employeeName} {employee.employeeSurname}</div>
              <div className="p-3 m-3 basis-2/12 text-lg">{employeeDepartmentsString} </div>
              <div className="p-3 m-3 basis-3/12 text-lg">{employeeRolesString}</div>
              <div className="p-3 m-3 basis-2/12 text-lg">{employee.employeeBudget} EUR</div>

              {editBtn}
          </div>
                          
        )

    } else return null
}

export default Employee