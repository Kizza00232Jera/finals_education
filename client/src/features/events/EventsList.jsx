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

      //this only shows my educations, but for admin it shows all educations
      //THIS IS HOW TO FILTER EVENTS BY DEPARTMENT AND TYPE
    let filteredIds
    if (isManager || isAdmin) {
        filteredIds = [...ids]
    } else {
        filteredIds = ids.filter(eventId => entities[eventId].employeeEmail === employeeEmail)
    }

    const tableContent = ids?.length && filteredIds.map(eventId => <Event key={eventId} eventId={eventId} />)

    let editLabel = null
    if (isManager || isAdmin) {
        editLabel = (
          <th scope="col" className="">Edit</th>

        )         
    }

      content = (
        <div>
              <h1>Educations</h1>
          <table className="w-full text-left ">
              <thead className="border  rounded-lg ">
                  <tr>
                      <th scope="col" className="">Title</th>
                      <th scope="col" className="">Price</th>
                      <th scope="col" className="">Start Date</th>
                      <th scope="col" className="">Likes</th>
                      {editLabel}
                  </tr>
              </thead>
              <tbody className="">
              {tableContent} 
              </tbody>
          </table>
        </div>
      )
    }
    
  return content
}

export default EventsList