import React from 'react'
import Event from './Event'
import { useGetEventsQuery } from './eventsApiSlice'


const EventsList = () => {
  const {
      data: events,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetEventsQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
      content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
      const { ids } = events
      const tableContent = ids?.length
      ? ids.map(eventId => <Event key={eventId} eventId={eventId} />)
      : null
          

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