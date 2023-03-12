import React from 'react'
import { useGetEmployeesQuery } from './employeesApiSlice'
import Employee from './Employee'

const EmployeesList = () => {

  const {
    data: employees,
    isLoading,
    isSuccess,
    isError,
    error
    //passing how often list to refresh, if we change tab and come back-refresh, if we remount component- refresh list
  } = useGetEmployeesQuery('employeesList', {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
  }

  )

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

    const { ids } = employees

    const tableContent = ids?.length && ids.map(employeeId => <Employee key={employeeId} employeeId={employeeId} />)
    //   console.log(employees)
    //   console.log(tableContent)
    content = (
      <div className="w-full text-left px-20 flex-grow">
          <div className='border  rounded-lg flex flex-row border-soft-gray mb-4 bg-white'>
            <div className="p-2 m-2 basis-4/12">Employee Name</div>
            <div className="p-2 m-2 basis-2/12">Department</div>
            <div className="p-2 m-2 basis-3/12">Roles</div>
            <div className="p-2 m-2 basis-2/12">AvailableBudget</div>
            <div className="p-2 m-2 basis-1/12">Edit</div>
          </div>
        <div className='flex flex-col'>
          {tableContent}
        </div>
      </div>
    )
  }

  return content
}


export default EmployeesList
