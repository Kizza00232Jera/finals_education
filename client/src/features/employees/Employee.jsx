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


        //console.log(employee)
        return (
            
            
              <tr className="border-2 border-soft-gray">
              <td className="p-2 m-2">{employee.employeeName}</td>
              <td className="p-2 m-2">{employee.employeeRole} </td>
              <td className="p-2 m-2">{employee.employeeRole}</td>
              <td className="p-2 m-2">{employee.employeeBudget} €</td>

              <td className="p-2 m-2">
                  <button
                      className="icon-button table__button"
                      onClick={handleEdit}
                      >
                      <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
              </td>
          </tr>
                          
        )

    } else return null
}

export default Employee