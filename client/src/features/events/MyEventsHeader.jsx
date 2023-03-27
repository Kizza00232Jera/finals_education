import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import contact from '../../img/contact.png'


const EventsHeader = () => {

  const { pathname } = useLocation()
  const { employeeName, employeeSurname, employeeEmail, employeeDepartment, employeeRole, employeeSpent, employeeBudget, employeeFund } = useAuth()

  return (
    <div className='mb-4'>
      <div className='border-b border-b-soft-gray '>

        <header className='h-28 flex flex-wrap content-center px-20 bg-white'>
          <div className='flex-grow'>
            <Link to="/dash/employees">
              <h1 className='text-3xl'>My Profile</h1>
              <p>{pathname}</p>
            </Link>
          </div>
        </header>
      </div>
      <div className='bg-invisible-gray p-3 py-2 mx-20 my-5 border border-soft-gray rounded-lg'>
        <div className='flex gap-4 border-b border-b-soft-gray pb-3'>
          <img src={contact} className="w-14 h-14" alt="logo" />
          <div className='flex flex-col gap-1'>
            <p className='font-medium text-black text-2xl'>{employeeName} {employeeSurname}</p>
            <p className='text-sm text-rich-gray font-medium'>{employeeEmail}</p>
          </div>
        </div>
        <div className='flex py-5'>
        <div className='flex flex-col basis-1/2 pr-40'>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Job Description:</p>
          <p className='text-sm font-bold text-black'>{employeeDepartment}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Department:</p>
          <p className='text-sm font-bold text-black'>{employeeDepartment}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Role:</p>
          <p className='text-sm font-bold text-black'>{employeeRole}</p>
          </div>
        </div>
        <div className='flex flex-col basis-1/2 pr-40'>
        <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Fund:</p>
          <p className='text-sm font-bold text-black'>{employeeFund}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Spent:</p>
          <p className='text-sm font-bold text-black'>{employeeSpent}</p>
          </div>
          <div className='flex flex-row justify-between'>
          <p className='text-sm font-bold text-black'>Remaining Budget:</p>
          <p className='text-sm font-bold text-black'>{employeeBudget}</p>
          </div>
        </div>
        </div>
      </div>
      <div className='flex gap-4 px-20 pt-4'>

        <div className="flex rounded-lg border border-solid border-soft-gray max-w-md">
          <div className="w-96">
            <div className="relative flex w-full flex-wrap items-stretch">
              <button
                className="flex items-center rounded-lg bg-white px-6 py-2.5 text-rich-gray"
                type="button"
              >
                <FontAwesomeIcon icon={faSearch} />
              </button>
              <input
                type="search"
                className=" m-0  block min-w-0 flex-auto  bg-white text-base font-normal text-neutral-700"
                placeholder="Search"
              />
            </div>
          </div>
        </div>
        <div className='bg-white w-fit p-2 px-8 rounded-lg text-primary font-bold h-fit border border-primary'>
          <Link
            to="http://localhost:3000/dash/employees/new">
            <FontAwesomeIcon className='pr-3' icon={faFilter} /> Filter
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EventsHeader
