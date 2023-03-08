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
    pollingInterval:60000,
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

      const tableContent = ids?.length
          ? ids.map(employeeId => <Employee key={employeeId} employeeId={employeeId} />)
          : null
        //   console.log(employees)
        //   console.log(tableContent)
      content = (
          <table className="table table--employees">
              <thead className="table__thead">
                  <tr>
                      <th scope="col" className="table__th employee__employeename">Employeename</th>
                      <th scope="col" className="table__th employee__roles">Roles</th>
                      <th scope="col" className="table__th employee__edit">Edit</th>
                  </tr>
              </thead>
              <tbody>
                  {tableContent}
              </tbody>
          </table>
      )
  }

  return content
}


export default EmployeesList
