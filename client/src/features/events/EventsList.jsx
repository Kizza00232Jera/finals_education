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
          <div className="basis-1/12 p-2 m-2">Edit</div>

        )         
    }

      content = (
        <div>
             
          <div className="w-full text-left ">
              <div className="border rounded-lg">
                  <div className='flex flex-row'>
                      <div className="basis-5/12 p-2 m-2">Title</div>
                      <div  className="basis-2/12 p-2 m-2">Price</div>
                      <div className="basis-2/12 p-2 m-2">Start Date</div>
                      <div  className="basis-2/12 p-2 m-2">Likes</div>
                      {editLabel}
                  </div>
              </div>
              <div className="flex flex-col">
              {tableContent} 
              </div>
          </div>
        </div>
      )
    }
    
  return content
}

export default EventsList