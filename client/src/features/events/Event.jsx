import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectEventById } from './eventsApiSlice'

import React from 'react'
import useAuth from '../../hooks/useAuth'

const Event = ({ eventId }) => {
    const event = useSelector(state => selectEventById(state, eventId))

    const navigate = useNavigate()
    const {  isManager, isAdmin } = useAuth()

    
    if (event) { 

        const handleEdit = () => navigate(`/dash/events/${eventId}`)
        const handleEventPage = () => navigate(`/dash/events/event/${eventId}`)
        
        let editBtn = null
        if (isManager || isAdmin) {
                editBtn = (
                <button
                data-testid={event.eventTitle}
                onClick={handleEdit}
                >
                <FontAwesomeIcon icon={faPenToSquare} />
            </button>
            )         
        }
      

      
        
      

        return (

         
            <div className="border border-soft-gray flex flex-row rounded-lg mb-2 bg-white">
                <div onClick={handleEventPage} className="basis-5/12 p-2 m-2 text-lg">{event.eventTitle}</div>
                <div className="p-2 m-2 basis-2/12 text-lg">{event.eventPrice} €</div>
                <div className="p-2 m-2 basis-2/12 text-lg">{event.eventStartDate}</div>
                <div className="p-2 m-2 basis-2/12 text-lg">123</div>
                <div className="p-2 m-2 basis-1/12 text-lg">       
                {editBtn}
                    </div>
                

                
            </div>
                    
        )

    } else return null
}
export default Event