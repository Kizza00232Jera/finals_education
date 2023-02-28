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

        //cellstatus is if employee is active or not, later can be styled
        const cellStatus = employee.active ? '' : 'table__cell--inactive'

        return (
            <tr className="table__row employee">
                <td className={`table__cell ${cellStatus}`}>{employee.employeeName}</td>
                <td className={`table__cell ${cellStatus}`}>{employeeRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
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