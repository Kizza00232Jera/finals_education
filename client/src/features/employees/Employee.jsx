import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectEmployeeById } from './employeesApiSlice'

import React from 'react'

const Employee = ({ employeeId }) => {
    const employee = useSelector(state => selectEmployeeById(state, employeeId))

    const navigate = useNavigate()

    if (employee) {
        const handleEdit = () => navigate(`/dash/employees/${employeeId}`)

        const employeeRolesString = employee.employeeRole.toString().replaceAll(',', ', ')
        const employeeDepartmentsString = employee.employeeDepartment.toString().replaceAll(',', ', ')
        

        //console.log(employee)
        return (
            
            
              <div className="border-2 border-soft-gray flex flex-row">
              <div className="p-2 m-2 basis-4/12">{employee.employeeName} {employee.employeeSurname}</div>
              <div className="p-2 m-2 basis-2/12">{employeeDepartmentsString} </div>
              <div className="p-2 m-2 basis-3/12">{employeeRolesString}</div>
              <div className="p-2 m-2 basis-2/12">{employee.employeeBudget} €</div>

              <div className="p-2 m-2 basis-1/12">
                  <button
                      className="icon-button table__button"
                      onClick={handleEdit}
                      >
                      <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
              </div>
          </div>
                          
        )

    } else return null
}

export default Employee