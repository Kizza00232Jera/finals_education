import React from 'react'
import contact from '../../img/contact.png'


const EmployeeLayout = ({ employee }) => {

 

    const content = (
        <>         
        <div className='bg-invisible-gray p-3 py-2 mx-20 my-5 border border-soft-gray rounded-lg'>
        <div className='flex gap-4 border-b border-b-soft-gray pb-3'>
          <img src={contact} className="w-14 h-14" alt="logo" />
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-black text-2xl'>{employee.employeeName} {employee.employeeSurname}</p>
            <p className='text-sm text-rich-gray font-medium'>{employee.employeeEmail}</p>
          </div>
        </div>
        <div className='flex py-5'>
        <div className='flex flex-col basis-1/2 pr-40'>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Job Description:</p>
          <p className='text-sm font-bold text-black'>{employee.employeeDepartment}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Department:</p>
          <p className='text-sm font-bold text-black'>{employee.employeeDepartment}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Role:</p>
          <p className='text-sm font-bold text-black'>{employee.employeeRole}</p>
          </div>
        </div>
        <div className='flex flex-col basis-1/2 pr-40'>
        <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Fund:</p>
          <p className='text-sm font-bold text-black'>{employee.employeeFund}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Spent:</p>
          <p className='text-sm font-bold text-black'>{employee.employeeSpent}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Remaining Budget:</p>
          <p className='text-sm font-bold text-black'>{employee.employeeBudget}</p>
          </div>
        </div>
        </div>
      </div>
        </>
    )


    return content

}

export default EmployeeLayout
