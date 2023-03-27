import { faFilter, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const EmployeeHeader = () => {

  const { pathname } = useLocation()



  return (
    <div className='mb-4 mt-8'>
      <div className='border-b border-b-soft-gray '>

    <header className='h-28 content-center px-20 bg-white'>
        <Link to="/dash/employees">
          <h1 className='text-3xl'>Employee</h1>
          <p>{pathname}</p>
        </Link>
    </header>
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
          <FontAwesomeIcon className='pr-3' icon={faFilter} /> Filterss
      </Link>
    </div>
          </div>
    </div>
  )
}

export default EmployeeHeader
