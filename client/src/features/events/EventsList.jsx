import React from 'react'
import Event from './Event'
import { useGetEventsQuery } from './eventsApiSlice'
import useAuth from "../../hooks/useAuth"

const EventsList = () => {

  const {employeeEmail, isManager, isAdmin } = useAuth()

  const {
      data: events,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetEventsQuery('eventsList', {
      pollingInterval: 45000,
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
      const { ids, entities } = events

    let filteredIds
    if (isManager || isAdmin) {
        filteredIds = [...ids]
    } else {
        filteredIds = ids.filter(eventId => entities[eventId].employeeEmail === employeeEmail)
    }

    const tableContent = ids?.length && filteredIds.map(eventId => <Event key={eventId} eventId={eventId} />)

      content = (
          <table className="table table--events">
              <thead className="table__thead">
                  <tr>
                      {/* <th scope="col" className="table__th event__status">Username</th>
                      <th scope="col" className="table__th event__created">Created</th>
                      <th scope="col" className="table__th event__updated">Updated</th> */}
                      <th scope="col" className="table__th event__title">Title</th>
                      <th scope="col" className="table__th event__username">Owner</th>
                      <th scope="col" className="table__th event__edit">Edit</th>
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

export default EventsList