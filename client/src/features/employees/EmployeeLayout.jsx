import React from 'react'


const EmployeeLayout = ({ employee }) => {

    const content = (
        <>         
            <div className="">
                <div className="">
                    <h2>{employee.employeeName} {employee.employeeSurname}</h2>
                    <p>{employee.employeeEmail}</p>
                    <p>{employee.employeeRole}</p>
                    <p>{employee.employeeDepartment}</p>
                    <p>{employee.employeeFund}</p>
                    <p>{employee.employeeSpent}</p>
                    <p>{employee.employeeBudget}</p>
                 
                </div>
            </div>
        </>
    )


    return content

}

export default EmployeeLayout
